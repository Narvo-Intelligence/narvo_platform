import { DashboardClient } from "@/components/dashboard/DashboardClient";
import type { Metadata } from "next";
import { ROUTE_REGISTRY, createRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRouteMetadata(ROUTE_REGISTRY.dashboard);

export default function DashboardPage() {
  return <DashboardClient />;
}
