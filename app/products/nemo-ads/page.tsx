import { NemoAds } from "@/components/products/nemo-ads";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "NEMO ADS",
  description: "NEMO ADS 官网",
  path: "/products/nemo-ads",
});

export default function NemoAdsPage(): ReactNode {
  return <NemoAds />;
}
