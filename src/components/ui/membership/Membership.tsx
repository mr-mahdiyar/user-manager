"use client";

import { type User } from "@/../../generated/prisma";
import { useSelectedMembership } from "@/context/useSelectedMembership";
import { useBase } from "@/hooks/base";
import { Spinner, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./Modal";

export default function Membership({ membership }: { membership: User }) {
  const { push } = useRouter();
  const fullName = membership.name + " " + membership.family;
  const { isFetchingBase, base } = useBase(membership.baseId, true);
  const { setSelectedMembership } = useSelectedMembership();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  function handleOnDeleteIconClick() {
    setSelectedMembership(membership);
    onOpen();
  }

  return (
    <>
      <tr className="even:bg-gray-200">
        <td align="center" className="mt-2 p-3">
          {fullName}
        </td>
        <td align="center" className="mt-2 p-3">
          {membership.fatherName}
        </td>
        <td align="center" className="mt-2 p-3">
          {membership.nationalCode}
        </td>
        <td align="center" className="mt-2 p-3">
          {isFetchingBase ? (
            <Spinner
              variant="dots"
              classNames={{
                base: "top-0 h-2 w-full",
              }}
            />
          ) : (
            base?.name
          )}
        </td>
        <td align="center" className="mt-2 p-3 flex justify-evenly items-center h-full">
          <IoPencil
            onClick={() => push(`/dashboard/memberships/edit/${membership.nationalCode}`)}
            className="cursor-pointer"
          />
          <MdDelete className="cursor-pointer text-red-500" onClick={handleOnDeleteIconClick} />
        </td>
      </tr>
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  );
}
