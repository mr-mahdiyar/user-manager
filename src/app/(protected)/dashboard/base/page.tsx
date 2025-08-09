"use client";

import { PageContainer } from "@/components/Container";
import PageTemplate from "@/components/ui/base/add/PageTemplate";
import { useBases } from "@/hooks/base";
import { Spinner } from "@heroui/react";

export default function BasesListPage() {
  const { bases, isFetchingBases, wasFetchingBasesFailure } = useBases();

  if (isFetchingBases) {
    return (
      <PageTemplate>
        <Spinner color="primary" />
      </PageTemplate>
    );
  }

  if (wasFetchingBasesFailure) {
    return (
      <PageTemplate>
        <p className="text-red-500">متاسفانه دریافت مرجع ها با خطا رو به رو شد.</p>
      </PageTemplate>
    );
  }

  if (bases?.length === 0)
    return (
      <PageTemplate>
        <p className="text-red-500">هنوز مرجعی اضافه نشده است.</p>
      </PageTemplate>
    );

  return (
    <PageContainer className="flex flex-col gap-y-8 p-12">
      {bases?.map((base) => (
        <section key={base.id} className="border rounded-md p-6 flex justify-between">
          <p>{base.name}</p>
        </section>
      ))}
    </PageContainer>
  );
}
