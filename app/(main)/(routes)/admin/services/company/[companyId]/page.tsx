import db from "@/lib/db"
import ServiceItemCrad from "../../../../(public)/services/_components/service-item-card"

const AdminServicesItemsPage = async ({
    params
}: {
    params: { companyId: string}
}) => {
    const companyId = decodeURI(params.companyId);

    let serviceItems;
    
    if (companyId === "no-company") {
        serviceItems = await db.serviceItem.findMany({
            where: {
                companyId: undefined
            },
            orderBy: {
                title: "desc"
            }
        });
    } else {
        serviceItems = await db.serviceItem.findMany({
            where: {
                companyId: params.companyId
            },
            orderBy: {
                title: "desc"
            }
        });
    }
    

    return (
    <div>
        {params.companyId}
        <div className="p-2 md:p-4 grid lg:grid-cols-2 gap-2 md:gap-3">
            {serviceItems.map((item) => (
                <ServiceItemCrad
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price!}
                    description={item.description!}
                    imageSrc={item.imageSrc!}
                    companyId={item.companyId!}
                    isAdmin={true}
                />
            ))}
        </div>
    </div>
  )
}

export default AdminServicesItemsPage