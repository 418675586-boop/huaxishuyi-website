"use client";

import { motion, type Variants } from "motion/react";
import { Check, X } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Status = "yes" | "no";

type Cell = { status: Status; note?: string };

const columns = [
  {
    name: "AI医生助手",
    featured: true,
  },
  {
    name: "传统医生工作模式",
    featured: false,
  },
];

const rows: { feature: string; cells: [Cell, Cell] }[] = [
  {
    feature: "工作入口",
    cells: [
      { status: "yes", note: "统一智能工作台，全场景能力集成" },
      { status: "no", note: "多系统频繁切换，操作碎片化" },
    ],
  },
  {
    feature: "病历录入",
    cells: [
      { status: "yes", note: "语音录入+AI自动生成，2.3分钟/份" },
      { status: "no", note: "手动键盘录入，14.7分钟/份" },
    ],
  },
  {
    feature: "病历质量",
    cells: [
      { status: "yes", note: "事前事中事后全流程质控，甲级率98%" },
      { status: "no", note: "事后抽查质控，甲级率85%" },
    ],
  },
  {
    feature: "风险防控",
    cells: [
      { status: "yes", note: "AI主动预警，差错率下降40%" },
      { status: "no", note: "人工识别风险，预警不及时" },
    ],
  },
  {
    feature: "任务管理",
    cells: [
      { status: "yes", note: "统一聚合，智能提醒，闭环追踪" },
      { status: "no", note: "散落各处，遗漏和延误频发" },
    ],
  },
  {
    feature: "数据复用",
    cells: [
      { status: "yes", note: "多AI联动，数据一次调用多处复用" },
      { status: "no", note: "重复录入，数据孤岛" },
    ],
  },
  {
    feature: "诊疗辅助",
    cells: [
      { status: "yes", note: "循证知识库+AI辅助决策，多专科视角" },
      { status: "no", note: "依赖个人经验，视角受限" },
    ],
  },
  {
    feature: "每日文书时间",
    cells: [
      { status: "yes", note: "节省2小时以上，核心诊疗精力释放" },
      { status: "no", note: "文书占工作40%+，诊疗精力被压缩" },
    ],
  },
];

const gridCols = "grid grid-cols-[1fr_2fr_2fr]";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

function StatusChip({
  status,
  featured,
}: {
  status: Status;
  featured?: boolean;
}) {
  if (status === "yes") {
    return (
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          featured
            ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
            : "border border-neutral-300 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-white/5 dark:text-neutral-400">
      <X className="h-3.5 w-3.5" />
    </span>
  );
}

function StatusCell({ cell, featured }: { cell: Cell; featured?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 ${
        cell.note ? "" : "justify-center"
      }`}
    >
      <StatusChip status={cell.status} featured={featured} />
      {cell.note ? (
        <span
          className={`text-sm leading-snug ${
            featured
              ? "font-medium text-neutral-900 dark:text-white"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {cell.note}
        </span>
      ) : (
        <span className="sr-only">不具备</span>
      )}
    </div>
  );
}

export default function Comparison8DoctorPlatform() {
  return (
    <section className="relative z-[1] w-full bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 sm:mb-12"
        >
          <span className="inline-flex w-fit rounded-full border border-neutral-300 px-3 py-1 text-[12px] tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
            对比优势
          </span>
          <h2 className="mt-4 text-balance text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
            传统医生工作模式 vs AI医生助手
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            从「多系统手动操作」到「统一智能工作台」的范式跃迁
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-950/5 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div
                className={`${gridCols} border-b border-[#050525]/60 dark:border-white/10`}
              >
                <div className="sticky left-0 z-10 flex items-end bg-[#050525] px-6 py-5 dark:bg-black lg:px-8">
                  <span className="text-sm font-bold text-white">对比维度</span>
                </div>
                {columns.map((column) => (
                  <div
                    key={column.name}
                    className={`flex items-end px-5 py-5 ${
                      column.featured
                        ? "border-x border-white/10 bg-[#050525]/80 dark:bg-black/80"
                        : "bg-[#050525]/60 dark:bg-black/60"
                    }`}
                  >
                    <span className="text-sm font-bold text-white">
                      {column.name}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {rows.map((row, rowIndex) => (
                  <motion.div
                    key={row.feature}
                    variants={rowVariants}
                    className={`${gridCols} ${
                      rowIndex === rows.length - 1
                        ? ""
                        : "border-b border-neutral-200 dark:border-white/10"
                    }`}
                  >
                    <div className="sticky left-0 z-10 flex items-center bg-white px-6 py-4 dark:bg-white/[0.08] dark:backdrop-blur-xl lg:px-8">
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {row.feature}
                      </span>
                    </div>
                    {row.cells.map((cell, cellIndex) => (
                      <div
                        key={cellIndex}
                        className={`flex items-center px-5 py-4 ${
                          columns[cellIndex]?.featured
                            ? "border-x border-neutral-200 bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.05]"
                            : ""
                        }`}
                      >
                        <StatusCell
                          cell={cell}
                          featured={columns[cellIndex]?.featured}
                        />
                      </div>
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent dark:from-neutral-900 lg:hidden" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-6 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          对比基于公开信息与典型场景能力整理，实际落地效果因部署环境而异。{" "}
          <span className="lg:hidden">左右滑动可查看全部列。</span>
        </motion.p>
      </div>
    </section>
  );
}
