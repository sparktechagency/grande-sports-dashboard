"use client";

import { toast } from "react-toastify";

export default async function copyToClipboard(copiedText: string) {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(copiedText);

      setTimeout(() => {
        toast.success("Copied to clipboard!");
      }, 0);
    } else {
      toast.error("Unable to copy because of unsecure origin: HTTP");
    }
  } catch (err) {
    console.error("Failed to copy text:", err);
  }
}
