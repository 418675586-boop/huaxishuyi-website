"use client";

import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "./accordion-gallery.css";

export type AccordionGalleryItem = {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
};

type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  /** Shared default image shown as connected slices on inactive panels */
  defaultImage?: string;
  defaultIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
};

type GalleryStyles = CSSProperties & {
  "--ag-accent": string;
  "--ag-overlay": string;
  "--ag-text": string;
  "--ag-gap": string;
  "--ag-radius": string;
};

export default function AccordionGallery({
  items,
  defaultImage,
  defaultIndex = 2,
  activeIndex,
  onActiveIndexChange,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const defaultImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === "vertical";
  const count = items.length;
  const [uncontrolledActive, setUncontrolledActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
  );
  const active = Math.min(
    Math.max(activeIndex ?? uncontrolledActive, 0),
    Math.max(count - 1, 0),
  );

  const changeActive = useCallback(
    (index: number) => {
      if (activeIndex === undefined) setUncontrolledActive(index);
      onActiveIndexChange?.(index);
    },
    [activeIndex, onActiveIndexChange],
  );

  const syncDefaultSlices = useCallback(() => {
    if (!defaultImage || vertical) return;
    const root = rootRef.current;
    if (!root) return;

    const galleryWidth = root.clientWidth;
    const galleryHeight = root.clientHeight;
    if (galleryWidth <= 0 || galleryHeight <= 0) return;

    const rootLeft = root.getBoundingClientRect().left;

    panelRefs.current.forEach((panel, index) => {
      const img = defaultImgRefs.current[index];
      if (!panel || !img) return;

      const sliceX = panel.getBoundingClientRect().left - rootLeft;

      // Cover-fit the shared plate to the gallery, then window each panel by true X.
      const naturalW = img.naturalWidth || galleryWidth;
      const naturalH = img.naturalHeight || galleryHeight;
      const scale = Math.max(galleryWidth / naturalW, galleryHeight / naturalH);
      const renderW = naturalW * scale;
      const renderH = naturalH * scale;
      const coverOffsetX = (galleryWidth - renderW) / 2;
      const coverOffsetY = (galleryHeight - renderH) / 2;

      img.style.width = `${renderW}px`;
      img.style.height = `${renderH}px`;
      img.style.maxWidth = "none";
      img.style.objectFit = "fill";
      img.style.objectPosition = "0 0";
      img.style.left = "0";
      img.style.top = "0";
      img.style.transform = `translate3d(${coverOffsetX - sliceX}px, ${coverOffsetY}px, 0)`;
    });
  }, [defaultImage, vertical]);

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
      const mediaSize = mediaSizeRef.current;
      const animationDuration = animate && !prefersReduced ? duration : 0;

      timelineRef.current?.kill();
      const timeline = gsap.timeline({
        onUpdate: syncDefaultSlices,
        onComplete: syncDefaultSlices,
      });

      panels.forEach((panel, index) => {
        if (!panel) return;

        const isActive = index === active;
        const media = mediaRefs.current[index];
        const bar = barRefs.current[index];
        const text = textRefs.current[index];
        const rotation = tilt === 0 ? 0 : isActive ? 0 : index < active ? tilt : -tilt;
        const rotationProps =
          tilt === 0
            ? {}
            : vertical
              ? { rotateX: -rotation }
              : { rotateY: rotation };

        timeline.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            ...rotationProps,
            "--ag-dim": isActive ? 0 : defaultImage ? 0.08 : 0.175,
            duration: animationDuration,
            ease,
          },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index));
          const shift = drift * parallax * mediaSize * 0.06;

          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": grayscale && isActive ? 0 : grayscale && !defaultImage ? 1 : 0,
              "--ag-dim": isActive ? 0 : 0.175,
              duration: animationDuration,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            timeline.to(
              [bar, text],
              {
                opacity: 1,
                x: 0,
                duration: animationDuration,
                ease,
                stagger: prefersReduced ? 0 : stagger,
              },
              0,
            );
          } else {
            timeline.to(
              [bar, text],
              {
                opacity: 0,
                x: -14,
                duration: animationDuration * 0.6,
                ease,
              },
              0,
            );
          }
        }
      });

      timelineRef.current = timeline;
      syncDefaultSlices();
    },
    [
      active,
      count,
      defaultImage,
      duration,
      ease,
      expandRatio,
      grayscale,
      parallax,
      showLabels,
      stagger,
      syncDefaultSlices,
      tilt,
      vertical,
    ],
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(
        140,
        usable * Math.min(Math.max(expandRatio, 0.2), 0.9),
      );

      mediaSizeRef.current = size;
      element.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRunRef.current);
      syncDefaultSlices();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [applyLayout, count, expandRatio, gap, syncDefaultSlices, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
    },
    [],
  );

  const handleClick = (index: number) => {
    if (index !== active) {
      changeActive(index);
      return;
    }
    const href = items[index]?.link;
    if (href) router.push(href);
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      changeActive((index + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      changeActive((index - 1 + count) % count);
    }
  };

  const styles: GalleryStyles = {
    "--ag-accent": accentColor,
    "--ag-overlay": overlayColor,
    "--ag-text": textColor,
    "--ag-gap": `${gap}px`,
    "--ag-radius": `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${defaultImage ? " accordion-gallery--panorama" : ""}${tilt !== 0 ? " accordion-gallery--tilted" : ""}${className ? ` ${className}` : ""}`}
      style={styles}
      role="list"
      aria-label="医疗能力展示"
      onMouseLeave={() => {
        if (trigger === "hover") changeActive(defaultIndex);
      }}
    >
      {items.map((item, index) => {
        const isActive = index === active;

        return (
          <button
            type="button"
            key={`${item.image}-${index}`}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={
              {
                borderRadius: `${radius}px`,
                ["--ag-radius" as string]: `${radius}px`,
              } as CSSProperties
            }
            onClick={() => handleClick(index)}
            onMouseEnter={() => {
              if (trigger === "hover") changeActive(index);
            }}
            onFocus={() => changeActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={
              item.link && isActive
                ? `进入${item.label || "详情页"}`
                : item.label
            }
          >
            <span className="ag-panel__frame">
              {defaultImage ? (
                <span
                  className={`ag-panel__default${isActive ? " is-hidden" : ""}`}
                  aria-hidden={isActive}
                >
                  <img
                    ref={(element) => {
                      defaultImgRefs.current[index] = element;
                    }}
                    src={defaultImage}
                    alt=""
                    draggable="false"
                    onLoad={syncDefaultSlices}
                  />
                </span>
              ) : null}

              <span
                className={`ag-panel__media${defaultImage && !isActive ? " is-hidden" : ""}`}
                ref={(element) => {
                  mediaRefs.current[index] = element;
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  draggable="false"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(element) => {
                    barRefs.current[index] = element;
                  }}
                />
                <span
                  className="ag-panel__text"
                  ref={(element) => {
                    textRefs.current[index] = element;
                  }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
