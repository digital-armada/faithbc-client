"use client";

import { useRef } from "react";
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
import { createNewMissions } from "@/features/missions/actions";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateMissionarySchema,
  CreateMissionaryType,
} from "@/src/domain/entities/models/Missionary";

export default function CreateNewMissionary() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateMissionaryType>({
    resolver: zodResolver(CreateMissionarySchema),
  });

  // TODO Fix toast success
  const onSubmit = async (formData) => {
    const result = await createNewMissions(formData);
    // if (!result?.success) {
    //   toast({
    //     title: "Error creating announcement",
    //     description: typeof result.message === "string" ? result.message : "",
    //   });
    // }
    if (result?.success) {
      toast({ title: "Announcement created successfully" });
    }
    reset();
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
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Create new missionary"
                type="text"
                {...register("name")}
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
                {...register("location")}
                className="col-span-3"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
          {/*
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
          )} */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
