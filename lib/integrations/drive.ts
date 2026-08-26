import { integrations, isDriveConfigured } from "./env";
import {
  catalogueDocuments,
  classifyDocument,
  type LibraryDocument,
} from "./documents";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  description?: string;
  webViewLink?: string;
  webContentLink?: string;
};

export async function fetchLibraryDocuments(): Promise<{
  documents: LibraryDocument[];
  fromDrive: boolean;
  error?: string;
}> {
  if (!isDriveConfigured()) {
    return { documents: catalogueDocuments, fromDrive: false };
  }

  const q = encodeURIComponent(
    `'${integrations.driveFolderId}' in parents and trashed = false`,
  );
  const fields = encodeURIComponent(
    "files(id,name,mimeType,modifiedTime,description,webViewLink,webContentLink)",
  );
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&pageSize=200&orderBy=modifiedTime desc&key=${integrations.driveApiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Drive API ${res.status}`);
    }
    const data = (await res.json()) as { files?: DriveFile[] };
    const files = (data.files ?? []).filter(
      (f) => f.mimeType !== "application/vnd.google-apps.folder",
    );
    const documents: LibraryDocument[] = files.map((file) => {
      const meta = classifyDocument(file.name);
      return {
        id: file.id,
        title: file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
        description: file.description || meta.description,
        category: meta.category,
        updatedAt: file.modifiedTime ?? "",
        mimeType: file.mimeType,
        previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
        downloadUrl:
          file.webContentLink ||
          `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${integrations.driveApiKey}`,
        source: "drive",
      };
    });
    return { documents, fromDrive: true };
  } catch (err) {
    return {
      documents: catalogueDocuments,
      fromDrive: false,
      error: err instanceof Error ? err.message : "Drive unavailable",
    };
  }
}
