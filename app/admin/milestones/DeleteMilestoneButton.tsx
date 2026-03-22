"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteMilestone } from "./actions";

export function DeleteMilestoneButton({ id, title }: { id: string, title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus sejarah "${title}"?`)) {
      startTransition(async () => {
        await deleteMilestone(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
      title="Hapus Sejarah"
    >
      {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
