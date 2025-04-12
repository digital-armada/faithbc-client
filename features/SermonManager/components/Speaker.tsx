import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface SpeakerData {
  id: string;
  attributes: { speaker: string };
}

interface SpeakerSelectProps {
  speakerList: SpeakerData[];
}

export function Speaker({ speakerList }: SpeakerSelectProps) {
  const { setValue, watch } = useFormContext();
  const [open, setOpen] = useState(false);

  const speakers = speakerList.map((speaker) => ({
    value: speaker.id,
    label: speaker.attributes.speaker,
  }));

  const currentSpeakerId = watch("speaker");
  const currentSpeaker = speakers.find((s) => s.value === currentSpeakerId);

  const selectSpeaker = (speakerLabel: string) => {
    const selectedSpeaker = speakers.find(
      (s) => s.label.toLowerCase() === speakerLabel.toLowerCase(),
    );

    if (selectedSpeaker) {
      setValue("speaker", selectedSpeaker.value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Speaker</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {currentSpeaker ? currentSpeaker.label : "Select speaker..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search speakers..." className="h-9" />
            <CommandList>
              <CommandEmpty>No speaker found.</CommandEmpty>
              <CommandGroup>
                {speakers.map((speaker) => (
                  <CommandItem
                    key={speaker.value}
                    onSelect={() => selectSpeaker(speaker.label)}
                  >
                    {speaker.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentSpeakerId === speaker.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
