import { z } from "zod";

export const BaseSchema = z.object({
  name: z.string().min(4, "نام مرجع حداقل باید چهار کاراکتر باشد."),
});

export type Base = z.infer<typeof BaseSchema>;
