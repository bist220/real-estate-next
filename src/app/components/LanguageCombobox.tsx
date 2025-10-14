"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Languages } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const locales = [
  {
    value: "en-US",
    label: "English",
  },
  {
    value: "hi-IN",
    label: "Hindi",
  },
  {
    value: "mr-IN",
    label: "Marathi",
  },
]

export function LanguageCombobox({onChange, currentLocale} : {onChange: (newLocale: string) => void, currentLocale: string}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(currentLocale)

  React.useEffect(()=>{
    setValue(currentLocale);
  }, [currentLocale])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
        //   className="w-[200px] justify-between"
          className="min-w-fit justify-between"
        >
          {value
            ? locales.find((locale) => locale.value === value)?.label
            : "Select locale..."}<Languages/>
          {/* <ChevronsUpDown className="opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      {/* <PopoverContent className="w-[200px] p-0 bg-white"> */}
      <PopoverContent className="max-w-fit p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search locale..." className="h-9" />
          <CommandList>
            <CommandEmpty>No locale found.</CommandEmpty>
            <CommandGroup>
              {locales.map((locale) => (
                <CommandItem
                  key={locale.value}
                  value={locale.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onChange(currentValue);
                  }}
                >
                  {locale.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === locale.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
