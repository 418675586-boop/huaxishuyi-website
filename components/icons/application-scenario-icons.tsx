import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import {
  BedDouble,
  CalendarDays,
  MonitorSmartphone,
  Video,
} from "lucide-react";

/** 互联网医院 — 线上诊疗终端 */
export const OnlineHospitalIcon = MonitorSmartphone;

/** 门诊接诊 — 听诊器，区别于核心功能区的 Gem */
export const OutpatientClinicIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M11 2v2" />
      <path d="M5 2v2" />
      <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
      <path d="M8 15a6 6 0 0 0 12 0v-3" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
);
OutpatientClinicIcon.displayName = "OutpatientClinicIcon";

/** 住院查房 — 病床 */
export const InpatientRoundIcon = BedDouble;

/** 远程会诊 — 远程视频协同 */
export const RemoteConsultationIcon = Video;

/** 事务管理 — 日程与待办 */
export const AffairsManagementIcon = CalendarDays;

/** 专科报告辅助 — 报告检索，区别于核心功能区的 FolderCheck */
export const SpecialtyReportIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <circle cx="11.5" cy="14.5" r="2.5" />
      <path d="M13.3 16.3 15 18" />
    </svg>
  ),
);
SpecialtyReportIcon.displayName = "SpecialtyReportIcon";
