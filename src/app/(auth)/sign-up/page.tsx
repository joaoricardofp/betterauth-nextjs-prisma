"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Spinner } from "@/components/ui/spinner";

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    formState: { errors, isSubmitting },
  } = form;
  const formErrorId = "sign-up-form-error";

  async function onSubmit(values: SignUpValues) {
    if (isSubmitting) {
      return;
    }

    form.clearErrors("root");

    const { error } = await signUp.email(values);

    if (error) {
      form.setError("root", {
        message:
          error.message || "Unable to create your account. Please try again.",
      });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create an account with your email and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            aria-describedby={errors.root?.message ? formErrorId : undefined}
            className="flex flex-col gap-5"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {errors.root?.message ? (
              <p
                aria-live="assertive"
                className="text-sm text-destructive"
                id={formErrorId}
                role="alert"
              >
                {errors.root.message}
              </p>
            ) : null}
            <FieldGroup>
              <Field
                data-disabled={isSubmitting}
                data-invalid={Boolean(errors.name)}
              >
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                  disabled={isSubmitting}
                  id="name"
                  type="text"
                  {...form.register("name")}
                />
                <FieldError errors={[errors.name]} id="name-error" />
              </Field>
              <Field
                data-disabled={isSubmitting}
                data-invalid={Boolean(errors.email)}
              >
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  disabled={isSubmitting}
                  id="email"
                  type="email"
                  {...form.register("email")}
                />
                <FieldError errors={[errors.email]} id="email-error" />
              </Field>
              <Field
                data-disabled={isSubmitting}
                data-invalid={Boolean(errors.password)}
              >
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputPassword
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  id="password"
                  {...form.register("password")}
                />
                <FieldError errors={[errors.password]} id="password-error" />
              </Field>
            </FieldGroup>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
