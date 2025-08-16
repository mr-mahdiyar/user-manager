import { PageContainer } from "@/components/Container";
import { MembershipForm } from "@/components/ui/membership/add/Form";

export default async function AddOrEditMembership({ params }: { params: Promise<{ slug: ["add" | "edit", string] }> }) {
  const { slug } = await params;
  const [mode, searchedNationalCode] = slug;

  const isEditMode = mode === "edit";
  const isCreateMode = !isEditMode;

  return (
    <PageContainer>
      <MembershipForm isCreateMode={isCreateMode} isEditMode={isEditMode} searchedNationalCode={searchedNationalCode} />
    </PageContainer>
  );
}
