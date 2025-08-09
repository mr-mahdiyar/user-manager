import { z } from "zod";

export const BaseSchema = z.object({
  name: z.string().min(4, "نام مرجع حداقل باید چهار کاراکتر باشد."),
  leader: z.string().min(4, "نام رییس مرجع حداقل باید شامل چهار کاراکتر باشد."),
  location: z.string().min(4, "وارد کردن نام روستای محل مرجع الزامیست."),
});

export type Base = z.infer<typeof BaseSchema>;
