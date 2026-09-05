"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroBackgroundVideoProps {
  src: string;
}

export function HeroBackgroundVideo({ src }: HeroBackgroundVideoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inHero, setInHero] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInHero(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) {
      return;
    }

    if (inHero) {
      video.muted = true;
      video.volume = 0;
      const play = video.play();
      if (play) {
        void play.catch(() => {
          /* Autoplay can be blocked until the page is interacted with. */
        });
      }
    } else {
      video.pause();
    }
  }, [inHero, reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        ref={hostRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.42_0.16_285_/_0.45),transparent_55%)]"
        aria-hidden
      />
    );
  }

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0" aria-hidden>
      <video
        ref={videoRef}
        className={cn(
          "fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ease-out",
          inHero ? "opacity-100" : "opacity-0"
        )}
        src={src}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.volume = 0;
        }}
      />
      <div
        className={cn(
          "fixed inset-0 z-0 bg-gradient-to-r from-background via-[oklch(0.18_0.08_280_/_0.82)] to-background/25 transition-opacity duration-500 ease-out",
          inHero ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
