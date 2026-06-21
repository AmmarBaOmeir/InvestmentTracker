import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/shared/lib";
import styles from "./svg.module.css";

export interface SVGProps extends HTMLAttributes<HTMLSpanElement> {
  src: string;
  fill?: string;
  size?: number | string;
  alt?: string;
  title?: string;
}

export function SVG({
  src,
  fill = "var(--primary)",
  size = "1em",
  alt,
  title,
  className,
  style,
  ...props
}: SVGProps) {
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={!alt ? "true" : undefined}
      className={cn(styles.span, className)}
      title={title}
      style={
        {
          "--svg-size": typeof size === "number" ? size + "px" : size,
          "--svg-color": fill,
          "--svg-url": 'url("' + src + '")',
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
