"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Root redirect — static export can't use server redirects,
 * so we route client-side to the saved (or default) language.
 */
export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("ormania.lang") === "fr"
        ? "fr"
        : "en";
    router.replace(`/${saved}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <Link href="/en" className="text-text-3 text-sm">
        Ormania — entering the boutique…
      </Link>
    </div>
  );
}
