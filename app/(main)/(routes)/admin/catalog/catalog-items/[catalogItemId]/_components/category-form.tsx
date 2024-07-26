"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CatalogItem } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: CatalogItem
  catalogItemId: string;
  options: { label: string; value: string;}[];
};

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  initialData,
  catalogItemId,
  options,
}: CategoryFormProps) =>{
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || ""
    }, 
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      await axios.patch(`/api/catalogItem/${catalogItemId}`, values);
      toast.success("Товар обновлен");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Что-то пошло не так")
    }
  }

  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return(
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Категория товара 
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Отмена</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Изменить категорию
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.categoryId && "text-slate-400 italic"
        )}>
          {selectedOption?.label || "Нет категории"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField 
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={options}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
