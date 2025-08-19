"use client";

import { PageContainer } from "@/components/Container";
import MembershipsList from "@/components/ui/membership/MembershipsList";

export default function DashboardPage() {
  return (
    <PageContainer className="grid place-items-center">
      <MembershipsList />
    </PageContainer>
  );
}
