"use client";

import { useForm, Controller, useFormState } from "react-hook-form";
import Container from "../../../../components/Container";
import Input from "../../../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, type Credentials } from "@/schema/credentials";
import { useEffect, useTransition } from "react";
import { findAdmin } from "@/services/admin";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const [transition, startTransition] = useTransition();
  const { replace } = useRouter();

  const {
    handleSubmit: reactHookFormHandleSubmit,
    control,
    setFocus,
    setError,
  } = useForm<Credentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(credentialsSchema),
  });

  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    setFocus("username", { shouldSelect: true });
  }, []);

  async function handleSubmit(values: Credentials) {

    const { username, password } = values;

    try {
      startTransition(async () => {
        const admin = await findAdmin(username, password);
        if (!admin) {
          setError("root", {
            message: "نام کاربری یا رمز عبور اشتباه است.",
          });
          return;
        }
        await login();
        replace("/dashboard")
      });
    } catch {
      setError("root", {
        message: "خطایی رخ داده است.",
      });
    }
  }

  return (
    <Container className="flex items-center justify-center h-full">
      <section className="flex flex-col justify-center items-center gap-y-8 w-96">
        <h1>خوش آمدید! برای ادامه وارد شوید...</h1>
        <form
          className="flex flex-col bg-linear-to-r from-primary/70 via-primary/40 to-primary/70  p-8 pb-4 rounded-xl w-full"
          onSubmit={reactHookFormHandleSubmit(handleSubmit)}
        >
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="my-3 text-left bg-secondary"
                placeholder="username"
                errorText={errors.username?.message}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="my-3 text-left bg-secondary"
                type="password"
                placeholder="password"
                errorText={errors.password?.message}
              />
            )}
            name="password"
          />
          <button
            className="bg-tertiary disabled:bg-tertiary/90 p-1 rounded-lg mt-6 cursor-pointer h-8"
            disabled={transition}
          >
            ورود
          </button>
          {errors.root && <p className="mt-4 text-red-500">{errors.root.message}</p>}
        </form>
      </section>
    </Container>
  );
}
