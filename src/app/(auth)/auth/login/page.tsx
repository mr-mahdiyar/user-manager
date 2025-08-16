"use client";

import { useForm, Controller, useFormState } from "react-hook-form";
import Container from "../../../../components/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, type Credentials } from "@/schema/credentials";
import { useEffect, useTransition } from "react";
import { findAdmin } from "@/services/admin";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button, addToast } from "@heroui/react";

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

  useEffect(() => {
    if (errors.root)
      addToast({
        title: "خطا",
        description: "نام کاربری یا رمز عبور اشتباه است.",
        color: "danger",
      });
  }, [errors.root]);

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
        replace("/dashboard/memberships");
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
        <form
          className="flex flex-col bg-emerald-300  p-8 pb-4 rounded-xl w-full gap-y-6 shadow-md"
          onSubmit={reactHookFormHandleSubmit(handleSubmit)}
        >
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                classNames={{
                  input: "placeholder:text-left text-left",
                  errorMessage: "mt-2 text-red-500 font-bold",
                }}
                placeholder="username"
                errorMessage={errors.username?.message}
                isInvalid={!!errors.username}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                classNames={{
                  input: "placeholder:text-left text-left",
                  errorMessage: "mt-2 text-red-500 font-bold",
                }}
                type="password"
                placeholder="password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
              />
            )}
            name="password"
          />
          <Button type="submit" variant="solid" className="bg-pink-600 text-white" disabled={transition}>
            ورود
          </Button>
        </form>
      </section>
    </Container>
  );
}
