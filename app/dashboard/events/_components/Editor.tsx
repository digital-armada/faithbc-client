import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RiAlignJustify, RiParagraph } from "react-icons/ri";
import {
  RxFontBold,
  RxFontItalic,
  RxPilcrow,
  RxStrikethrough,
  RxTextAlignCenter,
  RxTextAlignLeft,
  RxTextAlignRight,
} from "react-icons/rx";

const MenuBar = ({ editor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStarted, setDragStarted] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStarted(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 1.2; // Increased from 0.75 to 1.2
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStarted(false); // Clear immediately
  };

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    const currentContainer = containerRef.current;

    checkScroll();
    currentContainer?.addEventListener("scroll", checkScroll);

    return () => {
      currentContainer?.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  const handleButtonClick = (action: () => void) => (e: React.MouseEvent) => {
    if (isDragging || dragStarted) {
      e.preventDefault();
      return;
    }
    action();
  };

  if (!editor) return null;

  const baseButton = "rounded-md bg-slate-200 px-2 py-1 font-light";
  const activeButton = "bg-slate-400";
  const border = "border-r-[1px] border-slate-400 flex pr-1 space-x-1";

  return (
    <div className="control-group relative">
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-md"
          onClick={() => containerRef.current?.scrollBy(-100, 0)}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      )}

      <div
        ref={containerRef}
        className="button-group mobile-scroll scrollbar-none flex cursor-grab space-x-1 overflow-auto px-2 py-1 active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={border}>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("heading", { level: 1 }) && activeButton,
            )}
          >
            H1
          </button>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("heading", { level: 2 }) && activeButton,
            )}
          >
            H2
          </button>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("heading", { level: 3 }) && activeButton,
            )}
          >
            H3
          </button>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().setParagraph().run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("paragraph") && activeButton,
            )}
          >
            <RxPilcrow />
          </button>
        </div>
        <div className={border}>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleBold().run(),
            )}
            className={cn(baseButton, editor.isActive("bold") && activeButton)}
          >
            <RxFontBold />
          </button>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleItalic().run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("italic") && activeButton,
            )}
          >
            <RxFontItalic />
          </button>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleStrike().run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("strike") && activeButton,
            )}
          >
            <RxStrikethrough />
          </button>
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleHighlight().run(),
            )}
            className={cn(
              baseButton,
              editor.isActive("highlight") && activeButton,
            )}
          >
            Highlight
          </button>
        </div>
        <button
          type="button"
          onClick={handleButtonClick(() =>
            editor.chain().focus().setTextAlign("left").run(),
          )}
          className={cn(
            baseButton,
            editor.isActive({ textAlign: "left" }) && activeButton,
          )}
        >
          <RxTextAlignLeft />
        </button>
        <button
          type="button"
          onClick={handleButtonClick(() =>
            editor.chain().focus().setTextAlign("center").run(),
          )}
          className={cn(
            baseButton,
            editor.isActive({ textAlign: "center" }) && activeButton,
          )}
        >
          <RxTextAlignCenter />
        </button>
        <button
          type="button"
          onClick={handleButtonClick(() =>
            editor.chain().focus().setTextAlign("right").run(),
          )}
          className={cn(
            baseButton,
            editor.isActive({ textAlign: "right" }) && activeButton,
          )}
        >
          <RxTextAlignRight />
        </button>
        <button
          type="button"
          onClick={handleButtonClick(() =>
            editor.chain().focus().setTextAlign("justify").run(),
          )}
          className={cn(
            baseButton,
            editor.isActive({ textAlign: "justify" }) && activeButton,
          )}
        >
          <RiAlignJustify />
        </button>
      </div>

      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-md"
          onClick={() => containerRef.current?.scrollBy(100, 0)}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
export default function Editor({ content, onContentChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
    },
  });

  if (!editor) return null;

  return (
    <div className="relative">
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="rounded-lg border bg-white shadow-lg"
      >
        <MenuBar editor={editor} />
      </BubbleMenu>

      <EditorContent
        className="markdown"
        style={{ whiteSpace: "pre-line" }}
        editor={editor}
      />
    </div>
  );
}
