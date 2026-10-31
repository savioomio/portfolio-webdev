import type { CSSProperties } from "react";
import { brandLogos, type Brand } from "@/content/brandLogos";

interface BrandLogoProps {
  brand: Brand;
  className?: string;
  style?: CSSProperties;
}

export function BrandLogo({ brand, className, style }: BrandLogoProps) {
  const logo = brandLogos[brand];

  return (
    <svg
      viewBox={`0 0 ${logo.width} ${logo.height}`}
      role="img"
      aria-label={logo.name}
      className={className}
      style={style}
    >
      {logo.paths.map((path) => (
        <path key={path.d} d={path.d} fill={path.fill ?? "currentColor"} />
      ))}
    </svg>
  );
}
