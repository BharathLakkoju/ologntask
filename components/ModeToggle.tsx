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
      className="fixed top-4 right-4 dark:text-white text-black z-50 bg-transparent border-none hover:bg-transparent"
    >
      <SunMoon className="size-6 transition-all cursor-pointer" />
    </Button>
  );
}
