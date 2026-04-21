import { StatusBoard } from "@/components/status/StatusBoard";
import type { Metadata } from "next";
import { ROUTE_REGISTRY, createRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRouteMetadata(ROUTE_REGISTRY.status);

export default function StatusPage() {
  return <StatusBoard />;
}
