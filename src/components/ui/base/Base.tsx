"use client";

import { Base as BaseType } from "@/../../../../generated/prisma";
import { useSelectedBase } from "@/context/useSelectedBase";
import { useBaseMembershipsAmount } from "@/hooks/base";
import { Spinner, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./Modal";

export default function Base({ base }: { base: BaseType }) {

  const { setSelectedBase } = useSelectedBase();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { replace } = useRouter();

  const { membershipsAmount, isMembershipsAmountFetching } = useBaseMembershipsAmount(base.id.toString());

  return (
    <>
      <tr key={base.id} className="even:bg-gray-200">
        <td align="center" className="mt-2 p-3">
          {base.name}
        </td>
        <td align="center" className="mt-2 p-3">
          {base.location}
        </td>
        <td align="center" className="mt-2 p-3">
          {base.leader}
        </td>
        <td align="center" className="mt-2 p-3 overflow-hidden">
          {isMembershipsAmountFetching ? (
            <div className="h-2 grid place-items-center">
              <Spinner
                color="primary"
                size="sm"
                variant="dots"
                classNames={{
                  base: "-top-2",
                }}
              />
            </div>
          ) : (
            <span>{membershipsAmount}</span>
          )}
        </td>
        <td align="center" className="mt-2 p-3 flex justify-evenly">
          <IoPencil onClick={() => replace(`/dashboard/base/edit/${base.id}`)} className="cursor-pointer" />
          <MdDelete
            className="cursor-pointer"
            onClick={() => {
              setSelectedBase(base);
              onOpen();
            }}
          />
        </td>
      </tr>
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}/>
    </>
  );
}
