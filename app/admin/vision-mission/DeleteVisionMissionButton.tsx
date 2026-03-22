"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteVisionMission } from "./actions";

export function DeleteVisionMissionButton({ id, text }: { id: string, text: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus data ini: "${text.substring(0, 30)}..."?`)) {
      startTransition(async () => {
        await deleteVisionMission(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
      title="Hapus"
    >
      {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
