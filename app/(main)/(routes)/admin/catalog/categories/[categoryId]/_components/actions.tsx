"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    categoryId: string
    isPublished: boolean;
}

export const Actions = ({
    disabled,
    categoryId,
    isPublished
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);
    
    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/category/${categoryId}/unpublish`);
                toast.success("Категория архивирована");
            } else {
                await axios.patch(`/api/category/${categoryId}/publish`);
                toast.success("Категория опубликована");
                confetti.onOpen();
            }

            router.refresh();
        } catch {
            toast.error("Что-то пошло не так")
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/category/${categoryId}`)

            toast.success("Категория удалена");
            router.refresh()
            router.push(`/admin/catalog`)
        } catch {
            toast.error("Категория не была удалена")
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Архивировать" : "Опубликовать"}
            </Button>
            <ConfirmModal
                onConfirm={onDelete}
            >
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}