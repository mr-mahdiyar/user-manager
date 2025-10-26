"use client";

import { PageContainer } from "@/components/Container";
import Pagination from "@/components/Pagination";
import MembershipsList from "@/components/ui/membership/MembershipsList";
import { useMemberships } from "@/hooks/memebership";

export default function DashboardPage() {
  const { isMembershipsFetching, memberships } = useMemberships();
  return (
    <PageContainer className="flex flex-col items-center justify-between p-8">
      <MembershipsList isMembershipsFetching={isMembershipsFetching} memberships={memberships?.users} />
      <Pagination totalPages={memberships?.totalPages || 1} />
    </PageContainer>
  );
}
