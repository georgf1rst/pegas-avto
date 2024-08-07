import { checkRole } from "@/app/utils/check-role";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { phone, amount, date } = await req.json();

        const { userId } = auth()

        if (!checkRole("admin") && userId || !checkRole("admin") &&!userId){
            return new NextResponse("Not enough rights", { status: 401})
        }
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const slide = await db.appointment.create({
            data: {
                phone,
                amount,
                date
            }
        })

        return NextResponse.json(slide);


    } catch (error) {
        console.log("[scheduleAppointmentCreate]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}