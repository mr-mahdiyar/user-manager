import React from "react";
import { type Base } from "@prisma/client";
import BaseRow from "./Base";

export default function BaseLists({ bases }: { bases: Array<Base> }) {
  return (
    <table style={{ borderSpacing: "200px" }} className="border-spacing-3">
      <thead>
        <tr className="bg-gray-300">
          <th align="center" className="p-2">
            نام مرجع
          </th>
          <th align="center" className="p-2">
            محل مرجع
          </th>
          <th align="center" className="p-2">
            رییس مرجع
          </th>
          <th align="center" className="p-2">
            تعداد اعضا
          </th>
          <th align="center" className="p-2">
            عملیات
          </th>
        </tr>
      </thead>
      <tbody>
        {bases.map((base) => (
          <BaseRow base={base} key={base.id}/>
        ))}
      </tbody>
    </table>
  );
}
