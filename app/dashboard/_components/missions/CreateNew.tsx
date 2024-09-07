"use client";

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
import { createNewMissions } from "@/data/actions/missions-actions";
import { useFormState } from "react-dom";

const INITIAL_STATE = {
  data: null,
  // zodErrors: null,
  // message: null,
};

export default function CreateNew() {
  const [state, formAction] = useFormState(createNewMissions, INITIAL_STATE);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Missionary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-8">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                placeholder="Create new missionary"
                type="text"
                name="name"
                className="col-span-3"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                placeholder="Location"
                type="text"
                name="location"
                className="col-span-3"
                autoComplete="off"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
