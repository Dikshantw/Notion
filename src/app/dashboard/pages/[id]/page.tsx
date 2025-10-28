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
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
      ></textarea>
      <button onClick={handleUpdate}>{saving ? "Saving..." : "Save"}</button>
    </div>
  );
}
