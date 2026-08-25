"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const navLinks = [
  { href: "#", label: "首页" },
  { href: "#products", label: "产品服务" },
  { href: "#solutions", label: "解决方案" },
  { href: "#technology", label: "技术创新" },
  { href: "#news", label: "新闻动态" },
  { href: "#cases", label: "客户案例" },
  { href: "#about", label: "关于我们" },
];

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
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={link.href}
                  className="focus-ring rounded-md px-2.5 py-1 text-sm font-normal text-neutral-950 transition-colors hover:bg-black/5 hover:text-black dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {link.label}
                </Link>
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
                  key={link.href}
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
