import { PageContainer } from "@/components/Container";
import Form from "@/components/ui/base/add/Form";

export default async function AddBasePage({ params }: { params: Promise<{ slug: Array<string> }> }) {

  const { slug } = await params;

  return (
    <PageContainer className="flex justify-center items-center">
      <Form slug={slug} />
    </PageContainer>
  );
}
