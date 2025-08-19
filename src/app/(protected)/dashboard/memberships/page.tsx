"use client";

import { PageContainer } from "@/components/Container";
import MembershipsList from "@/components/ui/membership/MembershipsList";
import { useMemberships } from "@/hooks/memebership";
import { Spinner } from "@heroui/react";

export default function DashboardPage() {
  return (
    <PageContainer className="grid place-items-center">
      <MembershipsList />
    </PageContainer>
  );
}
