"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in");
    }
  }, [isPending, router, session]);

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    const { error } = await signOut();

    if (!error) {
      router.replace("/sign-in");
      return;
    }

    setIsSigningOut(false);
  }

  if (isPending) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          role="status"
        >
          <Spinner aria-hidden="true" />
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          role="status"
        >
          <Spinner aria-hidden="true" />
          Redirecting to sign in...
        </div>
      </main>
    );
  }

  const { user } = session;

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1>Dashboard</h1>
          </CardTitle>
          <CardDescription>You are signed in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p>Welcome, {user.name || "User"}!</p>
          <p className="text-muted-foreground">{user.email}</p>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isSigningOut}
            onClick={handleSignOut}
            type="button"
            variant="outline"
          >
            {isSigningOut ? <Spinner data-icon="inline-start" /> : null}
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
