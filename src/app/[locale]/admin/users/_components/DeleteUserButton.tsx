"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteUser } from "../_action/deleteUser";

type InitialState = {
  pending: boolean;
  status: number | null;
  message: string;
};

export default function DeleteUserButton({ userId }: { userId: string }) {
  const [state, setState] = useState<InitialState>({
    pending: false,
    status: null,
    message: "",
  });

  const handleDelete = async (userId: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await DeleteUser(userId);
      setState((prev) => {
        return { ...prev, status: res.status, message: res.message };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={state.pending}
      onClick={() => handleDelete(userId)}
    >
      <Trash2 />
    </Button>
  );
}
