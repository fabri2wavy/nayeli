/**
 * ============================================================================
 * HELPER PARA VIDEOS DE GOOGLE DRIVE Y ARCHIVOS LOCALES (.MP4)
 * ============================================================================
 * Detecta cualquier link compartido de Google Drive:
 * - https://drive.google.com/file/d/XXXX/view?usp=sharing
 * - https://drive.google.com/open?id=XXXX
 * - https://drive.google.com/uc?id=XXXX
 * y extrae automáticamente el ID para transformarlo en:
 *   https://drive.google.com/file/d/XXXX/preview
 */

export interface ParsedVideoSource {
  type: "drive" | "mp4" | "demo";
  embedUrl: string;
  fileId?: string;
}

export function getDriveEmbedUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // Patrón 1: /file/d/FILE_ID/...
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }

  // Patrón 2: ?id=FILE_ID o &id=FILE_ID
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }

  return trimmed;
}

export function resolveVideoSource(url: string): ParsedVideoSource {
  const trimmed = (url || "").trim();

  // Si es uno de los links de ejemplo aún sin reemplazar por un ID real de Drive
  if (trimmed.includes("1example_id_dia_")) {
    return {
      type: "demo",
      embedUrl: getDriveEmbedUrl(trimmed),
    };
  }

  // Si termina en .mp4, .webm, .mov o es una ruta local /videos/...
  if (
    /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(trimmed) ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("./")
  ) {
    return {
      type: "mp4",
      embedUrl: trimmed,
    };
  }

  // Si es de Google Drive
  if (trimmed.includes("drive.google.com")) {
    const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    return {
      type: "drive",
      embedUrl: getDriveEmbedUrl(trimmed),
      fileId: fileMatch ? fileMatch[1] : undefined,
    };
  }

  return {
    type: "drive",
    embedUrl: getDriveEmbedUrl(trimmed),
  };
}
