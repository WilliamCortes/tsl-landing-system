import type { ReactNode } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

interface LandingShellProps {
  children: ReactNode;
}

export default function LandingShell({ children }: LandingShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col bg-[var(--color-surface)]">{children}</main>
      <Footer />
    </div>
  );
}
