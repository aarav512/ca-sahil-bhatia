/**
 * Pulls latest public notices from official government sites at build time
 * (and on the GitHub Actions schedule). Client pages read public/data/updates.json.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outFile = join(__dirname, "..", "public", "data", "updates.json");

const SOURCES = [
  {
    id: "cbic",
    source: "CBIC",
    category: "GST",
    urls: ["https://cbic-gst.gov.in/index.html"],
    origin: "https://cbic-gst.gov.in",
  },
  {
    id: "it",
    source: "Income Tax",
    category: "ITR",
    urls: [
      "https://www.incometax.gov.in/iec/foportal/",
      "https://incometaxindia.gov.in/Pages/press-releases.aspx",
    ],
    origin: "https://incometaxindia.gov.in",
  },
  {
    id: "mca",
    source: "MCA",
    category: "MCA",
    urls: [
      "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/notifications.html",
      "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/circulars.html",
      "https://www.mca.gov.in/content/mca/global/en/home.html",
    ],
    origin: "https://www.mca.gov.in",
  },
];

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function absUrl(href, origin) {
  if (!href) return origin;
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return `https:${href}`;
  if (href.startsWith("/")) return origin + href;
  return `${origin}/${href}`;
}

function parseDate(text) {
  if (!text) return "";
  const named = text.match(
    /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i,
  );
  if (named) {
    const months = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };
    const mm = months[named[2].toLowerCase()];
    return `${named[3]}-${mm}-${named[1].padStart(2, "0")}`;
  }
  const m = text.match(/\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/);
  if (!m) return "";
  const day = Number(m[1]);
  const month = Number(m[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return "";
  return `${m[3]}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function cleanTitle(title) {
  return title.replace(/\s*English\s*\|\s*Hindi\s*/gi, " ").replace(/\s+/g, " ").trim();
}

function isJunkTitle(title, url) {
  if (/[{};]|fill:|\.cls-|\.shp|tspan|prefix__/i.test(title)) return true;
  if (/#\/|javascript:/i.test(url)) return true;
  if (/affiliated-offices|right-to-information|return-applicable/i.test(url)) return true;
  if (/Institute of Chartered|Competition Commission|Insolvency and Bankruptcy|National Company Law/i.test(title))
    return true;
  return false;
}

function classify(title, fallback) {
  const t = title.toLowerCase();
  if (/\bgst\b|gstr|cgst|igst|cbic/.test(t)) return "GST";
  if (/\bitr\b|income.?tax|form 16|tds/.test(t)) return "ITR";
  if (/\bmca\b|companies act|roc|llp/.test(t)) return "MCA";
  if (/complian|circular|notification|due date/.test(t)) return fallback === "GST" ? "GST" : "Compliance";
  return fallback;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "en-IN,en;q=0.9",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function itemsFromAnchors(html, origin, source, category, limit) {
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const seen = new Set();
  const items = [];
  let match;
  while ((match = re.exec(html))) {
    const href = match[1];
    const title = cleanTitle(stripTags(match[2]));
    if (title.length < 28 || title.length > 240) continue;
    if (/click here|read more|skip to|home|login|sitemap/i.test(title)) continue;
    const url = absUrl(href, origin);
    if (isJunkTitle(title, url)) continue;
    if (source !== "CBIC" && !/notification|circular|press|pdf|gazette|whats-new/i.test(url + title)) continue;
    if (seen.has(url + title)) continue;
    seen.add(url + title);
    items.push({
      id: `${source}-${items.length}-${Buffer.from(title).toString("base64").slice(0, 12)}`,
      title,
      source,
      category: classify(title, category),
      publishedAt: parseDate(title) || parseDate(html.slice(Math.max(0, match.index - 80), match.index + 200)),
      summary: title,
      url,
    });
    if (items.length >= limit) break;
  }
  return items;
}

function cbicWhatsNew(html, origin) {
  const pageDate = parseDate(html.match(/Last Updated[:\s]+([^<]+)/i)?.[1] || "");
  const block = html.split(/What'?s New/i)[1] || html;
  const slice = block.slice(0, 25000);
  const li = [...slice.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  const items = li
    .map((m, i) => {
      const inner = m[1];
      const title = cleanTitle(stripTags(inner));
      if (title.length < 24) return null;
      const href = (inner.match(/href=["']([^"']+)["']/i) || [])[1];
      return {
        id: `CBIC-${i}`,
        title,
        source: "CBIC",
        category: classify(title, "GST"),
        publishedAt: parseDate(title) || parseDate(inner) || pageDate,
        summary: title,
        url: absUrl(href, origin) || origin,
      };
    })
    .filter(Boolean);
  return items.slice(0, 16);
}

async function collect() {
  const all = [];
  const errors = [];

  for (const src of SOURCES) {
    let fetched = false;
    for (const pageUrl of src.urls) {
      try {
        const html = await fetchHtml(pageUrl);
        const parsed =
          src.id === "cbic"
            ? cbicWhatsNew(html, src.origin)
            : itemsFromAnchors(html, src.origin, src.source, src.category, 12);
        all.push(...parsed);
        fetched = true;
        if (parsed.length) break;
      } catch (err) {
        errors.push(String(err.message || err));
      }
    }
    if (!fetched) {
      /* keep going; other sources may succeed */
    }
  }

  const portals = [
    {
      id: "it-portal",
      title: "Income Tax Department — notifications, ITR utilities, and press releases",
      source: "Income Tax",
      category: "ITR",
      publishedAt: "",
      summary:
        "Income-tax notifications, circulars, and ITR related releases as published by the Department. Open the official portal for the current list.",
      url: "https://www.incometax.gov.in/iec/foportal/",
    },
    {
      id: "it-press",
      title: "Income Tax Department — press releases",
      source: "Income Tax",
      category: "ITR",
      publishedAt: "",
      summary: "Press releases relating to returns, utilities, and compliance dates.",
      url: "https://incometaxindia.gov.in/Pages/press-releases.aspx",
    },
    {
      id: "mca-notifications",
      title: "MCA — notifications",
      source: "MCA",
      category: "MCA",
      publishedAt: "",
      summary: "Company-law notifications as published by the Ministry of Corporate Affairs.",
      url: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/notifications.html",
    },
    {
      id: "mca-circulars",
      title: "MCA — circulars",
      source: "MCA",
      category: "Compliance",
      publishedAt: "",
      summary: "Circulars and compliance communications from the Ministry of Corporate Affairs.",
      url: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/circulars.html",
    },
  ];
  const itKeep = all.filter(
    (item) =>
      item.source !== "Income Tax" ||
      (/income|itr|tax|press|notification|circular|form 16|ais/i.test(item.title) &&
        !/vision|mission|values/i.test(item.title)),
  );
  all.length = 0;
  all.push(...itKeep);
  if (!all.some((item) => item.source === "Income Tax")) {
    all.push(...portals.filter((p) => p.source === "Income Tax"));
  }
  if (!all.some((item) => item.source === "MCA")) {
    all.push(...portals.filter((p) => p.source === "MCA"));
  }
  all.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  if (!all.length && existsSync(outFile)) {
    console.log("No new items fetched; keeping the previous updates file.");
    return;
  }
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(
    outFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        errors,
        items: all,
      },
      null,
      2,
    ),
  );
  console.log(`Wrote ${all.length} updates to ${outFile}${errors.length ? ` (errors: ${errors.join("; ")})` : ""}`);
}

collect().catch((err) => {
  console.error(err);
  if (!existsSync(outFile)) {
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(
      outFile,
      JSON.stringify({ generatedAt: new Date().toISOString(), errors: [String(err)], items: [] }, null, 2),
    );
  }
  process.exitCode = 0;
});
