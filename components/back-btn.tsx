"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()} className="text-base font-normal">
        Назад
    </Button>
  );
}
