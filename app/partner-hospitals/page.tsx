import { redirect } from "next/navigation";

/** 合作医院入口：当前仅有宣武医院，先跳转至该页 */
export default function PartnerHospitalsIndexPage() {
  redirect("/partner-hospitals/xuanwu-hospital");
}
