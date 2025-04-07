"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import { Translation } from "@/types/Translation";
import { ValidationError } from "@/validation/auth";
import { useActionState, useEffect } from "react";
import { addCategories } from "../_actions/addCategories";
import { toast } from "@/hooks/use-toast";

interface InitialValueProps {
  message?: string;
  error?: ValidationError;
  status?: number | null;
}

const initialState: InitialValueProps = {
  message: "",
  error: {},
  status: null,
};

export default function Form({ translations }: { translations: Translation }) {
  const [state, action, pending] = useActionState(addCategories, initialState);
  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message,
        className: state.status === 201 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.message, state.status]);
  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">
          {translations.admin.categories.form.name.label}
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={translations.admin.categories.form.name.placeholder}
          />
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Loader /> : translations.create}
          </Button>
        </div>
        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
      </div>
    </form>
  );
}
