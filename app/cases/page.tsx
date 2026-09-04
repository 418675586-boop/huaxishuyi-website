import { redirect } from "next/navigation";

/** 客户案例入口：当前仅有医院数智化转型案例，先跳转至该页 */
export default function CasesIndexPage() {
  redirect("/cases/hospital-digital-transformation");
}
