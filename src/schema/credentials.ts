import {z} from "zod";

export const credentialsSchema = z.object({
  username: z.string().min(4, "نام کاربری وارد شده باید حداقل شامل 4 کاراکتر باشد."),
  password: z.string().min(6, "رمز عبور وارد شده باید حداقل شامل 6 کاراکتر باشد.")
})

export type Credentials = z.infer<typeof credentialsSchema>;