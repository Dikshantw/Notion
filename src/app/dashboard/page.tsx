"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  return (
    <div>
      <p>
        Welcome, <span className="font-semibold">{session?.user?.name}</span>
      </p>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Log Out
      </button>
    </div>
  );
}
