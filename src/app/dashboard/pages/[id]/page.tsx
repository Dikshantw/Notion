"use client";
import { useEffect, useState } from "react";
import { getPageContent, updatePage } from "../../actions";
import { useParams } from "next/navigation";

export default function PageDetails() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { id } = useParams();

  async function getContent() {
    const page = await getPageContent(id as string);
    if (page?.content) setContent(page?.content);
  }
  useEffect(() => {
    getContent();
  }, []);
  async function handleUpdate() {
    setSaving(true);
    await updatePage(id as string, content);
    setSaving(false);
  }
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded min-h-[300px]"
        placeholder="Start typing..."
      ></textarea>
      <button
        onClick={handleUpdate}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
