"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IconHome } from "@/components/icons";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-bold mb-2">حدث خطأ غير متوقع</h1>
      <p className="text-sm text-muted-foreground mb-6">
        جرّب إعادة المحاولة أو العودة للرئيسية.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm"
        >
          إعادة المحاولة
        </button>
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm">
          <IconHome size={16} />
          الرئيسية
        </Link>
      </div>
    </div>
  );
}
