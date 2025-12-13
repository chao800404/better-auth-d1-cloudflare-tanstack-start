import authClient from "@/auth/authClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context?.session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: App,
});

function App() {
  const [isAuthActionInProgress, setIsAuthActionInProgress] = useState(false);
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;

  const handleAnonymousLogin = async () => {
    setIsAuthActionInProgress(true);
    try {
      const result = await authClient(publicUrl).signIn.anonymous();

      if (result.error) {
        setIsAuthActionInProgress(false);
        alert(`Anonymous login failed: ${result.error.message}`);
      } else {
        // Login succeeded - middleware will handle redirect to dashboard
        // Force a page refresh to trigger middleware redirect
        window.location.reload();
      }
    } catch (e: any) {
      setIsAuthActionInProgress(false);
      alert(`An unexpected error occurred during login: ${e.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Powered by better-auth-cloudflare.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-sm text-gray-600 text-center">
            No personal information required.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAnonymousLogin}
            className="w-full"
            disabled={isAuthActionInProgress}
          >
            {isAuthActionInProgress ? "Logging In..." : "Login Anonymously"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
