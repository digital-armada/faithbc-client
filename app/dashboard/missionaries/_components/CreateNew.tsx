"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNewMissions } from "@/app/dashboard/missionaries/_api/missions-actions";

type FormState = {
  data: any;
  error?: string | { message: string; details?: any } | undefined;
  success: boolean;
};

const INITIAL_STATE: FormState = {
  data: null,
  error: undefined,
  success: false,
};

export default function CreateNew() {
  const [state, setState] = useState<FormState>(INITIAL_STATE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setState({ ...INITIAL_STATE }); // Reset state before submitting

    try {
      const result = await createNewMissions(formData);
      setState(result);
    } catch (error) {
      setState({
        success: false,
        error: "An unexpected error occurred",
        data: null,
      });
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Missionary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Missionary</DialogTitle>
          <DialogDescription>
            Enter the missionary details below and click create.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Create new missionary"
                type="text"
                name="name"
                className="col-span-3"
                autoComplete="off"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Location"
                type="text"
                name="location"
                className="col-span-3"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>

          {state.success && (
            <p className="mt-2 text-green-600">
              Missionary created successfully!
            </p>
          )}
          {state.error && (
            <p className="mt-2 text-red-600">
              {typeof state.error === "string"
                ? state.error
                : state.error.message}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
