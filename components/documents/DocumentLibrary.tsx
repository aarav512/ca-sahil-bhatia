"use client";

import { useMemo, useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { fetchLibraryDocuments } from "@/lib/integrations/drive";
import { documentCategories, type LibraryDocument } from "@/lib/integrations/documents";
import { formatDate } from "@/lib/utils";
import { LuxuryButton } from "@/components/LuxuryButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export function DocumentLibrary() {
  const [docs, setDocs] = useState<LibraryDocument[]>([]);
  const [fromDrive, setFromDrive] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof documentCategories)[number]>("All");
  const [preview, setPreview] = useState<LibraryDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    fetchLibraryDocuments().then((res) => {
      if (!live) return;
      setDocs(res.documents);
      setFromDrive(res.fromDrive);
      setError(res.error);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return docs.filter((d) => {
      const hay = `${d.title} ${d.description} ${d.category}`.toLowerCase();
      const matchQ = hay.includes(q.toLowerCase());
      const matchC = cat === "All" || d.category === cat;
      return matchQ && matchC;
    });
  }, [docs, q, cat]);

  return (
    <div>
      <p className="mb-8 text-sm text-muted">
        {fromDrive
          ? "These files are listed from the practice Google Drive folder. Changes in Drive appear here on refresh."
          : "Connect a public Google Drive folder (see .env.example) to sync files automatically. The types below are the library the practice intends to host."}
      </p>
      {error ? <p className="mb-6 text-sm text-walnut">{error}</p> : null}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <label className="block w-full max-w-md">
          <span className="text-[11px] uppercase tracking-luxury text-champagne">Search</span>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search documents"
            aria-label="Search documents"
            className="mt-2"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Document categories">
          {documentCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-[11px] uppercase tracking-wideish ${
                cat === c ? "bg-navy text-pearl" : "border border-border text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse border border-border bg-stone/50" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <article
              key={doc.id}
              className="flex flex-col border border-champagne/30 bg-pearl/70 p-8"
            >
              <FileText className="h-5 w-5 text-champagne" aria-hidden />
              <p className="mt-4 text-[11px] uppercase tracking-luxury text-champagne">{doc.category}</p>
              <h3 className="mt-3 font-serif text-2xl text-navy">{doc.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{doc.description}</p>
              <p className="mt-4 text-xs text-walnut">
                {doc.updatedAt ? `Updated ${formatDate(doc.updatedAt)}` : "Date appears when synced from Drive"}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!doc.previewUrl}
                  onClick={() => setPreview(doc)}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-navy disabled:opacity-40"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden /> Preview
                </button>
                {doc.downloadUrl ? (
                  <a
                    href={doc.downloadUrl}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-champagne"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden /> Download
                  </a>
                ) : (
                  <span className="text-[11px] uppercase tracking-luxury text-muted">Download after Drive sync</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      {filtered.length === 0 && !loading ? (
        <p className="mt-12 text-muted">No documents match that search.</p>
      ) : null}

      <Dialog open={Boolean(preview)} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="w-[min(96vw,56rem)] p-0">
          <DialogTitle className="px-8 pt-8">{preview?.title}</DialogTitle>
          {preview?.previewUrl ? (
            <iframe
              title={preview.title}
              src={preview.previewUrl}
              className="mt-4 h-[70vh] w-full border-t border-border bg-white"
            />
          ) : null}
          <div className="p-6">
          {preview?.downloadUrl ? (
            <LuxuryButton href={preview.downloadUrl} variant="outline">
              Download
            </LuxuryButton>
          ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
