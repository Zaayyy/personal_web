"use client";

import React, { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: boolean;
  onComplete?: () => void;
}

const GLYPHS = "!<>-_\/[]{}—=+*^?#________";

interface CharState {
  char: string;
  resolved: boolean;
}

const getRandomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const generateInitialState = (text: string): CharState[] => {
  return text.split("").map((char) => ({
    char: char === " " ? " " : getRandomGlyph(),
    resolved: false,
  }));
};

export default function TextScramble({
  text,
  className,
  delay = 0,
  speed = 50,
  trigger = true,
  onComplete,
}: TextScrambleProps) {
  const [chars, setChars] = useState<CharState[]>(() => generateInitialState(text));
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!trigger) {
      setChars(generateInitialState(text));
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let animationFrameId: number | null = null;
    let lastGlyphUpdate = 0;
    const GLYPH_UPDATE_INTERVAL = 30;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const textLen = text.length;

      if (textLen === 0) {
        setChars([]);
        onCompleteRef.current?.();
        return;
      }

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const resolvedCount = Math.min(textLen, Math.floor(elapsed / speed));
        const shouldUpdateGlyphs = currentTime - lastGlyphUpdate >= GLYPH_UPDATE_INTERVAL;

        if (shouldUpdateGlyphs || resolvedCount >= textLen) {
          if (shouldUpdateGlyphs) {
            lastGlyphUpdate = currentTime;
          }

          setChars((prev) => {
            return text.split("").map((actualChar, idx) => {
              if (idx < resolvedCount) {
                return { char: actualChar, resolved: true };
              }
              if (actualChar === " ") {
                return { char: " ", resolved: false };
              }
              return {
                char: shouldUpdateGlyphs ? getRandomGlyph() : prev[idx]?.char || getRandomGlyph(),
                resolved: false,
              };
            });
          });
        }

        if (resolvedCount < textLen) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setChars(
            text.split("").map((char) => ({
              char,
              resolved: true,
            }))
          );
          onCompleteRef.current?.();
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [text, delay, speed, trigger]);

  return (
    <span className={className}>
      {chars.map((item, index) => (
        <span
          key={`${index}-${text[index] ?? ""}`}
          className={
            item.resolved
              ? undefined
              : "text-cyan-400/70 [text-shadow:0_0_8px_rgba(34,211,238,0.6)] drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]"
          }
        >
          {item.char}
        </span>
      ))}
    </span>
  );
}
