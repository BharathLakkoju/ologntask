"use client";
import React, { useEffect } from "react";
import { Spotlight } from "./ui/spotlight";
import { useTheme } from "next-themes";

export default function SpotLightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let { theme, resolvedTheme } = useTheme();
  let fillColor = "white";
  useEffect(() => {
    if (
      theme === undefined ||
      theme === "system" ||
      resolvedTheme === undefined ||
      resolvedTheme === "system"
    ) {
      theme = "dark";
      fillColor = "white";
    } else if (theme === "light") {
      fillColor = "purple";
    }
  }, [theme, fillColor, resolvedTheme])
  return (
    <>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={fillColor}
      />
      {children}
    </>
  );
}
