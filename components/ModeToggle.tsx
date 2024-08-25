"use client";

import * as React from "react";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const toggleDark = "dark";
const toggleLight = "light";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const handleClick = () => {
    if (theme === toggleDark) {
      setTheme(toggleLight);
    } else {
      setTheme(toggleDark);
    }
  };
  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="fixed top-4 right-4 dark:bg-zinc-400 bg-zinc-700 hover:bg-zinc-700 hover:text-zinc-900 z-50"
    >
      <SunMoon className="size-6 transition-all text-white dark:text-black cursor-pointer" />
    </Button>
  );
}
