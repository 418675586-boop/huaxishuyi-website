"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type NavMenuItem = { label: string; href?: string };

const partnerHospitals: NavMenuItem[] = [
  { label: "首都医科大学宣武医院", href: "/partner-hospitals/xuanwu-hospital" },
  { label: "四川省儿童医院", href: "/partner-hospitals/sichuan-children-hospital" },
  { label: "西藏自治区妇产儿童医院", href: "/partner-hospitals/tibet-maternity-children-hospital" },
  { label: "成都高新区妇女儿童医院", href: "/partner-hospitals/chengdu-hightech-women-children-hospital" },
  { label: "成都市郫都区妇幼保健院", href: "/partner-hospitals/chengdu-pidu-maternal-child-hospital" },
];

const solutions: NavMenuItem[] = [
  {
    label: "智慧医院/系统集成解决方案",
    href: "/solutions/smart-hospital-integration",
  },
  {
    label: "区域型医共体数智化解决方案",
    href: "/solutions/regional-medical-community",
  },
  {
    label: "医院数智化转型解决方案",
    href: "/solutions/hospital-digital-transformation",
  },
];

const navLinks: {
  href: string;
  label: string;
  menu?: NavMenuItem[];
}[] = [
  { href: "/", label: "首页" },
  { href: "/#products", label: "产品服务" },
  {
    href: "/#solutions",
    label: "解决方案",
    menu: solutions,
  },
  {
    href: "/partner-hospitals",
    label: "合作医院",
    menu: partnerHospitals,
  },
  { href: "/news", label: "新闻动态" },
  { href: "/cases", label: "合作案例" },
  { href: "/about", label: "关于我们" },
];

const navItemClassName =
  "focus-ring rounded-md px-2.5 py-1 text-sm font-normal text-neutral-950 transition-colors hover:bg-black/5 hover:text-black dark:text-white dark:hover:bg-white/10 dark:hover:text-white";

function NavFlyoutMenu({
  label,
  items,
  menuId,
}: {
  label: string;
  items: NavMenuItem[];
  menuId: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={navItemClassName}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-50 pt-2">
          <div
            id={menuId}
            role="menu"
            aria-label={label}
            className="min-w-[320px] rounded-2xl border border-neutral-200/80 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:border-white/15 dark:bg-white/10 dark:shadow-none dark:backdrop-blur-xl"
          >
            {items.map((item) => {
              const content = (
                <>
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover/item:opacity-100"
                    aria-hidden="true"
                  />
                </>
              );
              const itemClassName =
                "group/item flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-white/10";

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    className={itemClassName}
                    onClick={() => setOpen(false)}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  role="menuitem"
                  aria-disabled="true"
                  className={`${itemClassName} cursor-default`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Header(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 12;
    setIsScrolled((prev) => (prev === next ? prev : next));
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header
        className={[
          "fixed top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300",
          isScrolled || isOpen
            ? "bg-white/75 backdrop-blur-xl dark:bg-neutral-950/75"
            : "bg-transparent",
        ].join(" ")}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="mx-auto flex h-[66px] max-w-[1200px] items-center justify-between px-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link
              href="/"
              className="focus-ring flex items-center"
              aria-label="华西数医首页"
            >
              <Image
                src="/img/logo-light-mode.png"
                alt=""
                aria-hidden="true"
                width={121}
                height={44}
                priority
                className="block dark:hidden"
              />
              <Image
                src="/img/logo-dark-mode.png"
                alt=""
                aria-hidden="true"
                width={121}
                height={44}
                priority
                className="hidden dark:block"
              />
            </Link>
          </motion.div>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="主导航"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {link.menu ? (
                  <NavFlyoutMenu
                    label={link.label}
                    items={link.menu}
                    menuId={`${link.label}-menu`}
                  />
                ) : (
                  <Link href={link.href} className={navItemClassName}>
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className="focus-ring relative flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            <span
              className={`absolute h-0.5 w-5 transition-transform duration-300 ${isOpen ? "bg-white" : "bg-neutral-950 dark:bg-white"} ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            />
            <span
              className={`absolute h-5 w-0.5 transition-transform duration-300 ${isOpen ? "bg-white" : "bg-neutral-950 dark:bg-white"} ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="mx-auto flex h-full max-w-[1200px] flex-col items-start gap-3 px-4 pt-28 sm:px-6"
              aria-label="移动端主导航"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="focus-ring block text-4xl text-white transition-colors hover:text-white sm:text-5xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
