"use client";

import Container, { PageContainer } from "@/components/Container";
import { useBases } from "@/hooks/base";
import { Spinner } from "@heroui/react";

export default function BasesListPage() {
  const { bases, isFetchingBases, wasFetchingBasesFailure } = useBases();

  if (isFetchingBases) {
    return (
      <PageContainer>
        <Container className="flex justify-center items-center h-full">
          <Spinner color="primary" />
        </Container>
      </PageContainer>
    );
  }

  if (wasFetchingBasesFailure) {
    return (
      <PageContainer>
        <Container className="flex justify-center items-center h-full">
          <p className="text-red-500">متاسفانه دریافت مرجع ها با خطا رو به رو شد.</p>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-y-8 p-12">
      {bases?.map((base) => (
        <section key={base.id} className="border p-6">
          
        </section>
      ))}
    </PageContainer>
  );
}
