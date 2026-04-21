import { StatusBoard } from "@/components/status/StatusBoard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live health of every Narvo Platform service — synthesis, TTS, provenance, translation, audio delivery.",
};

export default function StatusPage() {
  return <StatusBoard />;
}
