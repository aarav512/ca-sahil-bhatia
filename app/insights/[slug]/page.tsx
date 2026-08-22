import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { insights, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
  };
}

export default async function InsightArticle({ params }: Props) {
  const { slug } = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: article.title, path: `/insights/${article.slug}` },
            ]),
          ),
        }}
      />
      <ReadingProgress />
      <article className="container max-w-3xl py-24">
        <p className="text-[11px] uppercase tracking-luxury text-champagne">
          {article.category}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy md:text-6xl">{article.title}</h1>
        <p className="mt-6 text-sm text-walnut">
          {formatDate(article.date)} · {article.read} · {site.name}
        </p>
        <div className="gold-line my-10" />
        <div className="space-y-6 text-lg leading-relaxed text-ink">
          {article.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-12 text-sm italic text-muted">{site.disclaimer}</p>
        <Link
          href="/insights"
          className="mt-10 inline-block text-[11px] uppercase tracking-luxury text-navy"
        >
          All notes
        </Link>
      </article>
    </>
  );
}
