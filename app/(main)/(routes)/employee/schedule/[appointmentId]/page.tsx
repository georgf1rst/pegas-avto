import { checkRole } from "@/app/utils/check-role"
import { Banner } from "@/components/banner"
import { IconBadge } from "@/components/icon-badge"
import db from "@/lib/db"
import { LayoutDashboard } from "lucide-react"
import { redirect } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { DeleteAction } from "./_components/delete-action"
  

const AppointmentIdPage = async ({
    params
}: {
    params: { appointmentId: string}
}) => {

    if(!checkRole("admin")){
        return redirect("/")
    }

    const appointment = await db.appointment.findUnique({
        where: {
            id: params.appointmentId
        }
    });

    if(!appointment){
        return redirect("/")
    }

    const requiredFields = [
        appointment.name,
        appointment.phone,
        appointment.date,
        appointment.status,
        appointment.amount,
    ]

    const totalFields = requiredFields.length;

    const completedFields = requiredFields.filter(Boolean).length;
    
    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);
    
    return (
        <>
            <div className="p-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/employee/schedule">Все записи</BreadcrumbLink>
                            </BreadcrumbItem>
                        
                        <BreadcrumbSeparator />
                            
                            <BreadcrumbItem>
                                <BreadcrumbPage>Эта запись</BreadcrumbPage>
                            </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="p-4">

            <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Настройки записи
                        </h1>
                        <span className="text-sm text-slate-700">
                            Заполните все строки {completionText}
                        </span>
                    </div>
                    <div className="w-40">
                        <DeleteAction
                            appointmentId={appointment.id}
                            btnStyle="icon"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Редактирование слайда
                            </h2>
                        </div>
                        {/* <TitleForm 
                            initialData={slide}
                            slideId={slide.id}
                            />
                        <DescriptionForm
                            initialData={slide}
                            slideId={slide.id}
                            />
                        <ImageForm
                            initialData={slide}
                            slideId={slide.id}
                            />
                        <BtnHrefForm
                            initialData={slide}
                            slideId={slide.id}
                            />
                        <PositionForm
                            initialData={slide}
                            slideId={slide.id}
                            /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppointmentIdPage;