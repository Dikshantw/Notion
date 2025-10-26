"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPage, getPages } from "./actions";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState<any[]>([]);

  async function getPagesList() {
    const res = await getPages();
    setPages(res);
  }
  useEffect(() => {
    getPagesList();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return [];

    const page = await createPage(title);
    setPages([page, ...pages]);
    setTitle("");
  }

  return (
    <div>
      <h1>Your pages</h1>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add page</button>
      </form>

      <ul>
        {pages.map((page) => (
          <li key={page.id}>{page.title}</li>
        ))}
      </ul>
    </div>
  );
}
