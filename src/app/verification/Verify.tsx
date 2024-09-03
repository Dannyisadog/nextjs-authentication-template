"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

interface VerifyProps {
  setError: (error: string) => void;
}

export default function Verify(props: VerifyProps) {
  const { setError } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  if (!token) {
    router.push("/signin");
  }

  const verify = useCallback(async () => {
    const response = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      router.push("/signin");
    } else {
      const data = await response.json();
      setError(data.message);
    }
  }, [router, token, setError]);

  useEffect(() => {
    verify();
  }, [token, verify]);

  return null;
}
