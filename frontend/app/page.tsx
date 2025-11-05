"use client";

import { Button } from "@/components/ui/button"; // path from shadcn UI setup

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-base-100">
      {/* DaisyUI button */}
      <button className="btn btn-primary">Click me</button>

      {/* shadcn UI button */}
      <Button variant="default">Shadcn Button</Button>
    </main>
  );
}
