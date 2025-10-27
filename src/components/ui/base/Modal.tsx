"use client";

import { useSelectedBase } from "@/context/useSelectedBase";
import { useDeleteBase } from "@/hooks/base";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalProps, Spinner } from "@heroui/react";

export default function DeleteModal(props?: Omit<ModalProps, "children">) {
  const { selectedBase } = useSelectedBase();

  const { deleteBase, isDeletingBase } = useDeleteBase(selectedBase.id);

  function handleClose() {
    try {
      deleteBase();
      props?.onClose!();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal isOpen={props?.isOpen} onOpenChange={props?.onOpenChange} backdrop="blur">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">حذف</ModalHeader>
            <ModalBody>
              {isDeletingBase ? (
                <Spinner color="primary" />
              ) : (
                <p>
                  آیا از حذف مرجع {selectedBase.name} {selectedBase.location} مطمعن هستید؟
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button className="bg-white" onPress={() => props?.onClose!()}>
                انصراف
              </Button>
              <Button color="danger" variant="light" onPress={handleClose}>
                حذف
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
