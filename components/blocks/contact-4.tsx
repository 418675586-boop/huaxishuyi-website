"use client";

import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function Contact4() {
  return (
    <section className="w-full bg-white dark:bg-transparent">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto mb-16 w-full lg:w-[80%]"
          >
            <div className="relative h-[400px] overflow-hidden rounded-4xl">
              <img
                src="/img/about/contact-ai-fullstack.png"
                alt="Huaxi Digital Medicine"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-br from-neutral-900/50 via-blue-900/25 to-teal-800/30" />
            </div>

            <div className="absolute inset-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:left-12 sm:top-12 sm:right-auto sm:bottom-auto sm:max-w-md sm:p-8 lg:p-10">
              <h2 className="mb-3 text-3xl font-normal leading-tight tracking-tight text-white sm:text-3xl lg:text-3xl">
                Advancing digital health
                <br />
                with full-stack AI.
              </h2>
              <p className="mb-4 text-sm tracking-tight text-white/90 sm:text-md lg:text-lg">
                From clinical workflows to trusted data spaces, Huaxi Digital
                Medicine helps hospitals build smarter, more precise care.
              </p>
              <Link
                href="/#solutions"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-white underline decoration-white/50 underline-offset-4 transition-all hover:decoration-white sm:text-base lg:text-lg"
              >
                Explore solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <div className="mx-auto grid w-full gap-12 sm:grid-cols-2 lg:w-[70%] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="mb-3 text-sm font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-600">
                Headquarters
              </p>
              <p className="text-base text-neutral-900 dark:text-neutral-100 sm:text-lg">
                8F, Building A3, Shuanghua Digital Health Industrial Park,
                No. 69 South Section of 3rd Ring Road, Wuhou District, Chengdu
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="mb-3 text-sm font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-600">
                Company Profile
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-base text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400 sm:text-lg"
              >
                Download brochure
                <Download className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="sm:col-span-2"
            >
              <p className="mb-3 text-sm font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-600">
                Get in touch
              </p>
              <a
                href="mailto:contact@huaxishuyi.com"
                className="inline-block border-b-2 border-neutral-900 text-base text-neutral-900 transition-colors hover:border-neutral-600 hover:text-neutral-600 dark:border-neutral-100 dark:text-neutral-100 dark:hover:border-neutral-400 dark:hover:text-neutral-400 sm:text-lg"
              >
                contact@huaxishuyi.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-[120px] w-full bg-[#F8F8F8] dark:bg-transparent"
      />
    </section>
  );
}
