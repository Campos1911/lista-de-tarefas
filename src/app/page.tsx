"use client";

import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/login");
  }, 1000);

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="border-2 border-t-transparent p-5 animate-spin rounded-full"></div>
    </main>
  );
}
