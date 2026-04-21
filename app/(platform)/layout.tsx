import { BgLayer } from "@/components/platform/BgLayer";
import { PlatformFooter } from "@/components/platform/PlatformFooter";
import { PlatformSidebar } from "@/components/platform/PlatformSidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BgLayer />
      <div className="platform-shell">
        <PlatformSidebar />
        <div className="platform-main">
          <div className="platform-main__scroll">{children}</div>
          <PlatformFooter />
        </div>
      </div>
    </>
  );
}
