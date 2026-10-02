import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/Button";
import { PageHeading } from "../components/PageHeading";
export function Workspace() {
  const [savedAt, setSavedAt] = useState<string>();
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "Write a workspace note…" })],
    content:
      "<h2>Welcome to Cxsun</h2><p>Use this local scratchpad to plan your first business application.</p>",
  });
  function saveNote() {
    if (!editor) return;
    const url = URL.createObjectURL(new Blob([editor.getHTML()], { type: "text/html" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "cxsun-note.html";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSavedAt(new Date().toLocaleTimeString());
    toast.success("Workspace note exported");
  }
  return (
    <>
      <PageHeading
        title="Workspace notes"
        description="A local scratchpad powered by Tiptap. Export notes before leaving the page."
        action={
          <Button onClick={saveNote}>
            <Download size={16} />
            Export note
          </Button>
        }
      />
      <section className="editor">
        <div className="editor-toolbar">
          <Button
            variant="secondary"
            aria-label="Bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold size={16} />
          </Button>
          <Button
            variant="secondary"
            aria-label="Italic"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} />
          </Button>
        </div>
        <EditorContent editor={editor} />
      </section>
      <p role="status">
        {savedAt ? `Last export at ${savedAt}` : "Notes remain in this page until you export them."}
      </p>
    </>
  );
}
