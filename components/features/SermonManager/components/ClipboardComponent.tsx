import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, Download } from "lucide-react";

interface ClipboardComponentProps {
  youtube: string;
}

export function ClipboardComponent({ youtube }: ClipboardComponentProps) {
  const copyToClipboard = (e) => {
    e.preventDefault();
    if (youtube) {
      navigator.clipboard.writeText(youtube);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Input value={youtube} readOnly className="flex-grow" />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="icon"
            title="Copy to clipboard"
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
        <Button asChild className="w-full">
          <Link
            href="https://ezmp3.cc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="mr-2 h-4 w-4" /> Convert to MP3
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
