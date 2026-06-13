import type { VideoPlayerProps } from "@/types/landing";

function getYoutubeEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.toString();
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-[var(--color-surface-alt)]">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="Video de la oferta"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={videoUrl} controls className="h-full w-full" />
      )}
    </div>
  );
}
