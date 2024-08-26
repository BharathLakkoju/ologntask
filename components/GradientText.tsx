"use client";
import React from "react";

export default function GradientText({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center">
      <h1 className="max-sm:text-4xl text-6xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
        {text}
      </h1>
    </div>
  );
}
