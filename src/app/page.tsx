"use client";

import { useForm, Controller, useFormState } from "react-hook-form";
import Container from "./components/Container";
import Input from "./components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, type Credentials } from "@/schema/credentials";
import { useEffect } from "react";

export default function HomePage() {
  const {
    handleSubmit: reactHookFormHandleSubmit,
    control,
    setFocus,
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

  function handleSubmit(values: Credentials) {
    console.log(values);
  }

  return (
    <Container className="flex items-center justify-center h-full">
      <section className="flex flex-col justify-center items-center gap-y-8 w-96">
        <h1>خوش آمدید! برای ادامه وارد شوید...</h1>
        <form
          className="flex flex-col bg-linear-to-r from-primary/70 via-primary/40 to-primary/70  p-8 rounded-xl w-full"
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
          <button className="bg-tertiary p-1 rounded-lg mt-6 cursor-pointer">ورود</button>
        </form>
      </section>
    </Container>
  );
}
