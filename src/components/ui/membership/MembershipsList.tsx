"use client";

import { useMemberships } from "@/hooks/memebership";
import { Spinner } from "@heroui/react";
import Membership from "./Membership";

export default function MembershipsList() {
  const { isMembershipsFetching, memberships } = useMemberships();

  if (isMembershipsFetching) {
    return <Spinner />;
  }

  if (memberships?.length === 0) {
    return <p className="text-red-500">هنوز هیچ عضوی اضافه نشده است.</p>;
  }

  return (
    <section className="w-full h-full p-8">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-300">
            <th align="center" className="p-2">
              نام عضو
            </th>
            <th align="center" className="p-2">
              نام پدر عضو
            </th>
            <th align="center" className="p-2">
              کد ملی عضو
            </th>
            <th align="center" className="p-2">
              مرجع عضو
            </th>
            <th align="center" className="p-2">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {memberships?.map((member) => (
            <Membership membership={member} key={member.nationalCode} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
