import Container, { PageContainer } from "@/components/Container";
import { type PropsWithChildren } from "react";

export default function PageTemplate({ children }: PropsWithChildren) {
  return (
    <PageContainer className="flex flex-col gap-y-8 p-12">
      <Container className="flex justify-center items-center h-full">{children}</Container>
    </PageContainer>
  );
}
