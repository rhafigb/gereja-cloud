import DashboardLayoutClient from "@/components/admin/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Gereja Cloud",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutClient>
        {children}
    </DashboardLayoutClient>
  );
}