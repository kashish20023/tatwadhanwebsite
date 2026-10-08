"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  animate,
  type AnimationPlaybackControls,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── Types ─────────────────────────────────────────────────── */

export interface BeforeAfterCardProps {
  /** Fully revealed “after” image URL. */
  afterSrc: string;
  /** Optional dedicated “before” image. When omitted, `afterSrc` is shown desaturated. */
  beforeSrc?: string;
  afterAlt?: string;
  beforeAlt?: string;
  /**
   * Corner label on the before side. Pass `""` to hide.
   * @default "Before"
   */
  beforeLabel?: string;
  /**
   * Corner label on the after side. Pass `""` to hide.
   * @default "After"
   */
  afterLabel?: string;
  /** Optional line under the frame. */
  caption?: string;
  /**
   * Wipe axis. Horizontal = left/right. Vertical = top/bottom.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Uncontrolled start position, 0 to 100.
   * 0 = fully before, 100 = fully after.
   * @default 50
   */
  defaultPosition?: number;
  /** Controlled position, 0 to 100. */
  position?: number;
  onPositionChange?: (position: number) => void;
  /** Show a live percent near the handle. @default true */
  showPercent?: boolean;
  /**
   * One-shot idle demo that gently scrubs the handle on first mount.
   * @default true
   */
  autoDemo?: boolean;
  className?: string;
  /** Custom aspect ratio or frame class (defaults to aspect-[3/2]) */
  aspectClassName?: string;
}

/* ─── Constants ─────────────────────────────────────────────── */

const KEY_STEP = 2;
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/* ─── Component ─────────────────────────────────────────────── */

/**
 * Before / After Card
 *
 * Photographic wipe driven by a motion value → clip-path so scrubbing stays
 * off the React render path. The percent badge updates via a DOM ref during drag.
 *
 * Reveal model: the after layer is clipped in from the left/top, so dragging
 * toward after paints color over the before grade.
 */
export function BeforeAfterCard({
  afterSrc,
  beforeSrc,
  afterAlt = "After",
  beforeAlt = "Before",
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  orientation = "horizontal",
  defaultPosition = 50,
  position,
  onPositionChange,
  showPercent = true,
  autoDemo = true,
  className,
  aspectClassName,
}: BeforeAfterCardProps) {
  const reduceMotion = useReducedMotion();
  const frameRef = React.useRef<HTMLDivElement>(null);
  const percentRef = React.useRef<HTMLSpanElement>(null);
  const dragging = React.useRef(false);
  const demoRan = React.useRef(false);
  const demoControls = React.useRef<AnimationPlaybackControls | null>(null);

  const isVertical = orientation === "vertical";
  const isControlled = position !== undefined;
  const initial = clamp01((isControlled ? position : defaultPosition) / 100);
  const showBeforeLabel = (beforeLabel ?? "").trim().length > 0;
  const showAfterLabel = (afterLabel ?? "").trim().length > 0;

  const wipe = useMotionValue(initial);
  const [a11yValue, setA11yValue] = React.useState(() =>
    Math.round(initial * 100),
  );
  const [pressed, setPressed] = React.useState(false);

  // Keep the live percent on a ref during scrub, no React re-render per frame.
  useMotionValueEvent(wipe, "change", (v) => {
    const pct = Math.round(clamp01(v) * 100);
    if (percentRef.current) percentRef.current.textContent = String(pct);
    if (!dragging.current) setA11yValue(pct);
  });

  // Controlled: position prop is source of truth (including mid-drag echoes).
  React.useEffect(() => {
    if (!isControlled) return;
    wipe.set(clamp01(position / 100));
  }, [isControlled, position, wipe]);

  // One-shot auto demo, teaches the gesture, then rests.
  React.useEffect(() => {
    if (!autoDemo || reduceMotion || isControlled || demoRan.current) return;
    demoRan.current = true;
    const from = clamp01(defaultPosition / 100);
    demoControls.current = animate(wipe, [from, Math.min(1, from + 0.22), from], {
      duration: 1.65,
      times: [0, 0.55, 1],
      ease: EASE_OUT,
      delay: 0.45,
    });
    return () => {
      demoControls.current?.stop();
      demoControls.current = null;
    };
  }, [autoDemo, reduceMotion, isControlled, defaultPosition, wipe]);

  // After sits on top and is revealed as position increases.
  const clipPath = useTransform(wipe, (v) => {
    const t = clamp01(v) * 100;
    return isVertical
      ? `inset(0 0 ${100 - t}% 0)`
      : `inset(0 ${100 - t}% 0 0)`;
  });

  const handleLeft = useTransform(wipe, (v) =>
    isVertical ? "50%" : `${clamp01(v) * 100}%`,
  );
  const handleTop = useTransform(wipe, (v) =>
    isVertical ? `${clamp01(v) * 100}%` : "50%",
  );

  const stopDemo = () => {
    if (!demoControls.current) return;
    demoControls.current.stop();
    demoControls.current = null;
  };

  const commit = (next01: number) => {
    const clamped = clamp01(next01);
    const pct = Math.round(clamped * 100);
    if (isControlled) {
      // Parent owns the value, only notify; the sync effect drives wipe.
      onPositionChange?.(pct);
      return;
    }
    wipe.set(clamped);
    onPositionChange?.(pct);
  };

  const setFromPointer = (clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    commit(
      isVertical
        ? (clientY - rect.top) / rect.height
        : (clientX - rect.left) / rect.width,
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    stopDemo();
    dragging.current = true;
    setPressed(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromPointer(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromPointer(e.clientX, e.clientY);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setPressed(false);
    setA11yValue(Math.round(clamp01(wipe.get()) * 100));
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = wipe.get();
    let next: number | null = null;
    const backward =
      e.key === "ArrowLeft" || e.key === "ArrowUp";
    const forward =
      e.key === "ArrowRight" || e.key === "ArrowDown";

    if (backward) next = current - KEY_STEP / 100;
    else if (forward) next = current + KEY_STEP / 100;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 1;
    else if (e.key === "PageDown") next = current - 0.1;
    else if (e.key === "PageUp") next = current + 0.1;

    if (next === null) return;
    e.preventDefault();
    stopDemo();
    commit(next);
  };

  const beforeImageSrc = beforeSrc ?? afterSrc;

  return (
    <figure className={cn("w-full", className)}>
      <div
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-orientation={orientation}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={a11yValue}
        aria-valuetext={`${a11yValue}% after`}
        aria-label="Compare before and after"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className={cn(
          "relative isolate w-full overflow-hidden rounded-lg",
          aspectClassName || "aspect-[3/2]",
          "bg-[#0a0a0b] outline-none",
          "ring-1 ring-black/10 dark:ring-white/10",
          "[box-shadow:0_1px_2px_rgba(0,0,0,.12),0_24px_48px_-28px_rgba(0,0,0,.55)]",
          "dark:[box-shadow:0_1px_2px_rgba(0,0,0,.5),0_28px_56px_-28px_rgba(0,0,0,.85)]",
          "focus-visible:ring-2 focus-visible:ring-[#DC2F2F]/75 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[#fafafa] dark:focus-visible:ring-offset-[#0a0a0b]",
          isVertical ? "cursor-ns-resize" : "cursor-ew-resize",
          "touch-none select-none",
        )}
      >
        {/* Before (base) */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeImageSrc}
            alt={beforeAlt}
            draggable={false}
            decoding="async"
            className={cn(
              "h-full w-full object-cover",
              !beforeSrc && "grayscale contrast-[0.92] brightness-[0.88]",
            )}
          />
          {!beforeSrc ? (
            <div
              aria-hidden
              className="absolute inset-0 bg-[#1a1c20]/25 mix-blend-multiply"
            />
          ) : null}
        </div>

        {/* After (clipped reveal) */}
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterSrc}
            alt={afterAlt}
            draggable={false}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Soft vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.28)_0%,transparent_30%,transparent_72%,rgba(0,0,0,.16)_100%)]"
        />

        {/* Corner labels */}
        {showBeforeLabel ? (
          <span
            className={cn(
              "pointer-events-none absolute z-10 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90",
              isVertical ? "bottom-3.5 left-3.5" : "bottom-3.5 right-3.5",
            )}
          >
            {beforeLabel}
          </span>
        ) : null}
        {showAfterLabel ? (
          <span
            className={cn(
              "pointer-events-none absolute z-10 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90",
              isVertical ? "left-3.5 top-3.5" : "bottom-3.5 left-3.5",
            )}
          >
            {afterLabel}
          </span>
        ) : null}

        {/* Divider line */}
        {isVertical ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 z-20 h-0.5 bg-white [box-shadow:0_0_12px_rgba(0,0,0,.35)]"
            style={{ top: handleTop, y: "-50%" }}
          />
        ) : (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white [box-shadow:0_0_12px_rgba(0,0,0,.35)]"
            style={{ left: handleLeft, x: "-50%" }}
          />
        )}

        {/* Drag knob */}
        <motion.div
          className="pointer-events-none absolute z-30"
          style={{
            left: handleLeft,
            top: handleTop,
            x: "-50%",
            y: "-50%",
          }}
        >
          <motion.div
            animate={{ scale: pressed ? 0.92 : 1 }}
            transition={{ duration: 0.12, ease: EASE_OUT }}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full",
              "bg-white text-neutral-800",
              "[box-shadow:0_1px_2px_rgba(0,0,0,.22),0_8px_22px_-6px_rgba(0,0,0,.55)]",
              "ring-1 ring-black/5",
            )}
          >
            <HandleChevrons vertical={isVertical} />
            {showPercent ? (
              <span
                ref={percentRef}
                className={cn(
                  "absolute rounded-md bg-black/60 px-1.5 py-0.5",
                  "text-[10px] font-medium tabular-nums tracking-wide text-white",
                  isVertical
                    ? "left-1/2 top-[calc(100%+8px)] -translate-x-1/2"
                    : "left-[calc(100%+8px)] top-1/2 -translate-y-1/2",
                )}
              >
                {a11yValue}
              </span>
            ) : null}
          </motion.div>
        </motion.div>
      </div>

      {caption ? (
        <figcaption className="mt-3 px-1 text-center text-[13px] leading-relaxed text-neutral-500 dark:text-white/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function HandleChevrons({ vertical }: { vertical: boolean }) {
  return (
    <svg
      width={vertical ? 12 : 16}
      height={vertical ? 16 : 12}
      viewBox={vertical ? "0 0 12 16" : "0 0 16 12"}
      fill="none"
      aria-hidden
    >
      {vertical ? (
        <>
          <path d="M6 1.25L10.25 5.75H1.75L6 1.25Z" fill="currentColor" />
          <path d="M6 14.75L1.75 10.25H10.25L6 14.75Z" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M1.25 6L5.75 1.75V10.25L1.25 6Z" fill="currentColor" />
          <path d="M14.75 6L10.25 1.75V10.25L14.75 6Z" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
