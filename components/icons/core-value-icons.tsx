import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import { Box, ShieldCheck, Siren } from "lucide-react";

export const MedicalRecordIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide ${className ?? ""}`}
      aria-hidden={props["aria-hidden"]}
    >
      <rect x="9" y="5" width="6" height="2" rx="1" />
      <rect x="5" y="7" width="14" height="14" rx="2" />
      <path d="M12 10.5v3" />
      <path d="M10 12h4" />
      <path d="M10 15.5h4" />
    </svg>
  ),
);

MedicalRecordIcon.displayName = "MedicalRecordIcon";

export const ValueCubeIcon = Box;
export const ValueShieldCheckIcon = ShieldCheck;
export const ValueSirenIcon = Siren;
