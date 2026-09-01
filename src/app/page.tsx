import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-2xl flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Next.js Starter
          </h1>
          <p className="max-w-xl text-muted-foreground">
            A minimal starter with Better Auth, Prisma, shadcn/ui, and a
            production-friendly authentication flow.
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-xl border bg-black px-8 py-7">
          <Image
            alt="Next.js"
            className="h-6 w-auto invert"
            height={24}
            priority
            src="/next.svg"
            width={118}
          />
          <Image
            alt="Better Auth"
            className="h-6 w-auto invert"
            height={21}
            priority
            src="/better-auth.svg"
            width={160}
          />
          <Image
            alt="Prisma"
            className="h-8 w-auto"
            height={34}
            priority
            src="/prisma.svg"
            width={132}
          />
        </div>

        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
          <Link className={buttonVariants({ size: "lg" })} href="/sign-up">
            Get started
          </Link>
          <Link
            className={buttonVariants({ size: "lg", variant: "outline" })}
            href="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
