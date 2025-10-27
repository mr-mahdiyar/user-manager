"use client";

import { initialUser, useSelectedMembership } from "@/context/useSelectedMembership";
import { useDeleteMembership } from "@/hooks/memebership";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, Spinner } from "@heroui/react";

export default function DeleteModal(props?: Omit<ModalProps, "children">) {
  const {
    selectedMembership: { name, family, nationalCode },
    setSelectedMembership,
  } = useSelectedMembership();

  const fullName = name + " " + family;

  const { deleteMembership, isDeletingMembership } = useDeleteMembership(nationalCode);

  function handleClose(mode: "submit" | "cancel") {
    if (mode === "cancel") {
      setSelectedMembership(initialUser);
      props?.onClose!();
      return;
    }

    try {
      deleteMembership();
    } catch (error) {
      console.error(error);
    } finally {
      props?.onClose!();
    }
  }

  return (
    <Modal isOpen={props?.isOpen} onOpenChange={props?.onOpenChange} backdrop="blur">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">حذف</ModalHeader>
            <ModalBody>
              {isDeletingMembership ? <Spinner color="primary" /> : <p>آیا از حذف {fullName} مطمعن هستید؟</p>}
            </ModalBody>
            <ModalFooter>
              <Button className="bg-white" onPress={() => handleClose("cancel")}>
                انصراف
              </Button>
              <Button color="danger" variant="light" onPress={() => handleClose("submit")}>
                حذف
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
