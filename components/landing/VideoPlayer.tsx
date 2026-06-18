"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { VideoPlayerProps } from "@/types/landing";

function getYoutubeId(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1) || null;
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const match = url.pathname.match(/^\/embed\/([^/?]+)/);
      if (match) return match[1];
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideoPlayer({ videoUrl, onEnded }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYoutubeId(videoUrl);

  // controls=0 → oculta barra de YouTube (seek, velocidad, calidad, fullscreen)
  // disablekb=1 → desactiva atajos de teclado dentro del iframe
  // rel=0 → sin videos relacionados al terminar
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&disablekb=1&playsinline=1`
    : null;

  // Miniatura de alta calidad de YouTube
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  // Escuchar eventos de estado desde YouTube vía postMessage
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.data) return;
      let data: { event?: string; info?: number };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (data.event === "onStateChange") {
        if (data.info === 1) {
          setIsPlaying(true);
        } else if (data.info === 2 || data.info === -1) {
          setIsPlaying(false);
        } else if (data.info === 0) {
          setIsPlaying(false);
          onEnded?.();
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onEnded]);

  const send = useCallback((func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: "" }),
      "*"
    );
  }, []);

  // Al hacer clic en la miniatura: revelar iframe y empezar a reproducir
  const handleFirstPlay = useCallback(() => {
    setStarted(true);
    // Pequeño delay para que el iframe se muestre antes de enviar el comando
    setTimeout(() => send("playVideo"), 300);
  }, [send]);

  const togglePlay = useCallback(() => {
    if (isPlaying) send("pauseVideo");
    else send("playVideo");
  }, [isPlaying, send]);

  if (!embedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video src={videoUrl} controls className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
      {/* iframe siempre presente en el DOM; pointer-events:none evita interacción directa */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ pointerEvents: "none" }}
        title="Video de la oferta"
      />

      {/* Miniatura personalizada — oculta el UI nativo de YouTube antes de reproducir */}
      {!started && (
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
          style={{ zIndex: 20, backgroundColor: "#000" }}
          onClick={handleFirstPlay}
          role="button"
          aria-label="Reproducir video"
        >
          {thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt="Miniatura del video"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          )}
          {/* Botón play personalizado */}
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 shadow-xl backdrop-blur-sm transition-transform hover:scale-105 active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-10 w-10 translate-x-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Overlay transparente post-inicio: captura clicks → solo pause/play */}
      {started && (
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
          style={{ zIndex: 15 }}
          onClick={togglePlay}
          role="button"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {!isPlaying && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
