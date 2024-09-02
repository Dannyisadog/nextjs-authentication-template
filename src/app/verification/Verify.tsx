"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Verify() {
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
    }
  }, [router, token]);

  useEffect(() => {
    verify();
  }, [token, verify]);

  return null;
}
