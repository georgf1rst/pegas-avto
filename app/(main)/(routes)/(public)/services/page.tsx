import db from "@/lib/db";
import ServiceItemCrad from "./_components/service-item-card";


import { Metadata } from "next";
import { Logo } from "@/app/(main)/_components/logo";


export const metadata: Metadata = {
    title: {
        default: "Каталог услуг",
        template: "%s | Услуги"
    },
    description: "Услуги по автоэлектрике в городе Атырау.",    
};


const ServicesPage = async () => {
    
    let companies = await db.company.findMany({
        include: {
            serviceItems: {
                where: {
                    isPublished: true,
                },
                orderBy: [
                    {
                        title: "desc"
                    },
                    {
                        companyId: "desc"
                    }
                ]
            }
        }
    });

    // companies.map(async (company) => {
    //     const services = await db.serviceItem.findMany({
    //         where: {
    //             companyId: company.id
    //         },
    //         orderBy: [
    //             {
    //                 title: "desc"
    //             },
    //             {
    //                 companyId: "desc"
    //             }
    //         ]
    //     })
    //     company.serviceItems = services;
    // })


    // const servicesItems = await db.serviceItem.findMany({
    //     where: {
    //         isPublished: true,
    //     },
    //     include: {
    //         company: true,
    //     },
    //     orderBy: [
    //         {
    //             title: "desc"
    //         },
    //         {
    //             companyId: "desc"
    //         }

    //     ]
    // });



    return ( 
        <div className="">
            {companies.map((company) => (
                company.serviceItems.length > 0 && (
                    <div key={company.id} className="p-2 md:p-4 gap-4 flex flex-col justify-center items-center">
                        {company.name == "Пегас avto A" && (
                            <div className="flex justify-center items-center scale-125">
                                <Logo/>
                            </div>
                        )}
                        {company.name == "Injector Service" && (
                            <div className="flex justify-center items-center text-2xl font-bold text-yellow-800 dark:text-red-700">
                                Injector Service
                            </div>

                        )}
                        <div className=" grid lg:grid-cols-2 gap-2 md:gap-3">
                        {company.serviceItems.map((item) => (
                            <ServiceItemCrad
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description!}
                                price={item.price!}
                                imageSrc={item.imageSrc!}
                                isAdmin={false}
                            />
                        ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
    
}
 
export default ServicesPage;