"use client";

import { PageContainer } from "@/components/Container";
import MembershipsList from "@/components/ui/membership/MembershipsList";
import { useMemberships } from "@/hooks/memebership";

export default function DashboardPage() {
  const { isMembershipsFetching, memberships } = useMemberships();
  return (
    <PageContainer className="grid place-items-center">
      <MembershipsList isMembershipsFetching={isMembershipsFetching} memberships={memberships} />
    </PageContainer>
  );
}
