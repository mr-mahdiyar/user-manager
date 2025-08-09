"use client";

import { PageContainer } from "@/components/Container";
import BasesList from "@/components/ui/base/BaseLists";
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

  if (!bases?.length)
    return (
      <PageTemplate>
        <p className="text-red-500">هنوز مرجعی اضافه نشده است.</p>
      </PageTemplate>
    );

  return (
    <PageContainer className="flex flex-col gap-y-8 p-12">
      <BasesList bases={bases} />
    </PageContainer>
  );
}
