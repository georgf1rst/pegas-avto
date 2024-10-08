import { CatalogItem, Category, ImageSrcMultiple } from "@prisma/client";
import db from "@/lib/db";

type CatalogItemWithCategory = CatalogItem & {
    imageSrcs: ImageSrcMultiple[] 
}

type GetCatalogItems = {
    title?: string;
    sort?: "asc" | "desc" | "none"
    categoryId?: string;
}

export const getCatalogItems = async ({
    title,
    sort,
    categoryId,
}: GetCatalogItems): Promise<CatalogItemWithCategory[]> => {
    
    if(sort != "none"){sort = sort}
    else{sort = undefined}
    
    try{

        

        const catalogItems = await db.catalogItem.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
                categoryId: categoryId,
                isAvailable: true,
            },
            include: {
                imageSrcs: {
                    orderBy: {
                        position: "asc"
                    }
                },
            },
            orderBy: {
                Price: sort
            }
        })

        // const catalogItems = await db.catalogItem.findMany({
        //     where: {
        //         isPublished: true,
        //         title: {
        //             contains: title,
        //         },
        //         categoryId,
        //     },
        //     include: {
        //         category: true,
        //     },
        //     orderBy: {
        //         title: "asc"
        //     }
        // });

        const catalogItemsWithCategory: CatalogItemWithCategory[] = await Promise.all(
            catalogItems.map(async catalogItem => {
                return {
                    ...catalogItem
                }
            })
        )
        return catalogItemsWithCategory;
    } catch (error) {
        console.log("[GET_CATALOG_ITEMS]")
        return[];
    }
}