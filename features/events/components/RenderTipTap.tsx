"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link"; // Add Link extension
import { marked } from "marked";

const RenderTipTap = ({ content }: { content: string }) => {
  // Parse Markdown to HTML
  const parsedContent = marked.parse(content, { async: false }) as string;

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Link.configure({
        openOnClick: true, // Ensure links are clickable
        autolink: false, // Disable autolink since Markdown handles it
        HTMLAttributes: {
          target: "_blank", // Open links in new tab
          rel: "noopener noreferrer", // Security best practice
        },
      }),
    ],
    content: parsedContent,
    editable: false, // Keep as false for read-only
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(parsedContent);
    }
  }, [content, editor]);

  return <EditorContent className="markdown" editor={editor} />;
};

export default RenderTipTap;
