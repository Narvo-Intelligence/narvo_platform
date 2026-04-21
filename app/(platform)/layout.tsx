import { BgLayer } from "@/components/platform/BgLayer";
import { PlatformFooter } from "@/components/platform/PlatformFooter";
import { PlatformHeader } from "@/components/platform/PlatformHeader";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BgLayer />
      <div className="platform-shell">
        <PlatformHeader />
        <div className="platform-main">
          <div className="platform-main__scroll">{children}</div>
          <PlatformFooter />
        </div>
      </div>
    </>
  );
}
