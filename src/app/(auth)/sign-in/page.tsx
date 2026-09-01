"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "@/lib/auth-client";
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

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { errors, isSubmitting },
  } = form;
  const formErrorId = "sign-in-form-error";

  async function onSubmit(values: SignInValues) {
    if (isSubmitting) {
      return;
    }

    form.clearErrors("root");

    const { error } = await signIn.email(values);

    if (error) {
      form.setError("root", {
        message: error.message || "Unable to sign in. Please try again.",
      });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to continue.
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
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  id="password"
                  {...form.register("password")}
                />
                <FieldError errors={[errors.password]} id="password-error" />
              </Field>
            </FieldGroup>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
