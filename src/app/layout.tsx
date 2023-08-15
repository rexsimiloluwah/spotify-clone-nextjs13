import SidebarLayout from "@/components/SidebarLayout";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import SkeletonProvider from "@/providers/SkeletonProvider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthSessionProvider>
          <SkeletonProvider>
            <SidebarLayout>{children}</SidebarLayout>
          </SkeletonProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
