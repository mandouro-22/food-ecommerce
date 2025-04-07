"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteCategory } from "../_actions/DeleteCategory";
import { toast } from "@/hooks/use-toast";

type StateTypes = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

export default function DeleteCategory({ id }: { id: string }) {
  const [state, setState] = useState<StateTypes>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
      setState((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await deleteCategory(id);
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  useEffect(() => {
    toast({
      title: state.message,
      className: state.status === 200 ? "text-green-400" : "text-destructive",
    });
  }, [state.message, state.status]);

  return (
    <Button
      variant="secondary"
      disabled={state.isLoading}
      onClick={handleDelete}>
      <Trash2 />
    </Button>
  );
}
