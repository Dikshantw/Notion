"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPage, getPages } from "./actions";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState<any[]>([]);
  const session = useSession();
  const router = useRouter();
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
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">
          {session.data?.user?.name}'s pages
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add page
        </button>
      </form>

      <ul className="space-y-2">
        {pages.map((page) => (
          <li
            key={page.id}
            onClick={() => router.push(`/dashboard/pages/${page.id}`)}
            className="p-3 rounded cursor-pointer hover:bg-gray-50 hover:text-black"
          >
            {page.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
