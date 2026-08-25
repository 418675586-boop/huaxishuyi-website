"use client";

import { motion, type Variants } from "motion/react";
import { Check, X } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Status = "yes" | "no";

type Cell = { status: Status; note?: string };

const columns = [
  {
    name: "AI医联体平台",
    featured: true,
  },
  {
    name: "传统医联体协同",
    featured: false,
  },
];

const groups: {
  title: string;
  rows: { feature: string; cells: [Cell, Cell] }[];
}[] = [
  {
    title: "协同服务",
    rows: [
      {
        feature: "数据共享",
        cells: [
          { status: "yes", note: "跨机构数据中台，患者360全景" },
          { status: "no", note: "系统独立，信息无法共享" },
        ],
      },
      {
        feature: "远程会诊",
        cells: [
          { status: "yes", note: "会诊+数字MDT+远程查房" },
          { status: "no", note: "依赖电话沟通" },
        ],
      },
      {
        feature: "双向转诊",
        cells: [
          { status: "yes", note: "线上智能转诊，响应率100%" },
          { status: "no", note: "线下审批，响应慢" },
        ],
      },
      {
        feature: "检验互认",
        cells: [
          { status: "yes", note: "检验/影像/心电/病理共享" },
          { status: "no", note: "重复检查，互认率低" },
        ],
      },
    ],
  },
  {
    title: "赋能与运营",
    rows: [
      {
        feature: "基层赋能",
        cells: [
          { status: "yes", note: "AI辅助+专家数字分身" },
          { status: "no", note: "缺少上级实时指导" },
        ],
      },
      {
        feature: "资源调度",
        cells: [
          { status: "yes", note: "集团统筹排班排床与号源" },
          { status: "no", note: "各院区独立排班" },
        ],
      },
      {
        feature: "协同管控",
        cells: [
          { status: "yes", note: "统一权限审计+运营监控" },
          { status: "no", note: "缺乏统一管控体系" },
        ],
      },
      {
        feature: "能力迭代",
        cells: [
          { status: "yes", note: "临床数据驱动持续进化" },
          { status: "no", note: "静态平台不随使用提升" },
        ],
      },
    ],
  },
];

const rows = groups.flatMap((group) => group.rows);

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

export default function Comparison8() {
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
            传统医联体协同 vs AI医联体平台
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            从「机构各自为政」到「跨机构AI协同」的范式跃迁
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
              <div className={`${gridCols} border-b border-[#050525]/60 dark:border-white/10`}>
                <div className="sticky left-0 z-10 flex items-end bg-[#050525] px-6 py-5 dark:bg-black lg:px-8">
                  <span className="text-sm font-bold text-white">
                    能力维度
                  </span>
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
