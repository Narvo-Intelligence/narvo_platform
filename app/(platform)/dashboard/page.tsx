import { DashboardClient } from "@/components/dashboard/DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Quota gauge, latency P95, error rate, API key management. Preview the paying-tenant experience.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
