"use client";

import { useSelectedBase } from "@/context/useSelectedBase";
import { useDeleteBase } from "@/hooks/base";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
  Spinner,
  addToast,
} from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";

export default function DeleteModal(props?: Omit<ModalProps, "children">) {
  const { selectedBase, setSelectedBase } = useSelectedBase();

  const client = useQueryClient();
  
  const { deleteBase, isDeletingBase, wasDeletingBaseSuccessful, wasDeletingBaseFailure } = useDeleteBase(
    selectedBase.id
  );

  function handleClose() {
    try {
      deleteBase();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (wasDeletingBaseFailure) {
      addToast({
        title: "خطا",
        description: `حذف مرجع ${selectedBase.name} با خطا مواجه شد.`,
        color: "danger",
      });
      setSelectedBase({
        id: -1,
        location: "",
        leader: "",
        name: "",
      });
      if (props && props.onClose) props.onClose();
    }
  }, [wasDeletingBaseFailure]);

  useEffect(() => {
    if (wasDeletingBaseSuccessful) {
      addToast({
        title: "حذف",
        description: "مرجع با موفقیت حذف شد.",
        color: "success",
      });
      client.invalidateQueries({
        queryKey: ["bases"],
      });
      setSelectedBase({
        id: -1,
        location: "",
        leader: "",
        name: "",
      });
      if (props && props.onClose) props.onClose();
    }
  }, [wasDeletingBaseSuccessful]);
  return (
    <Modal isOpen={props?.isOpen} onOpenChange={props?.onOpenChange}>
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
              <Button className="bg-white" onPress={handleClose}>
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
