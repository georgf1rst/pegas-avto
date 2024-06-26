import { SearchCatalog } from "@/components/search-input";
import { Suspense } from "react";

interface CatalogPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const CatalogPage = ({
    searchParams
}: CatalogPageProps) => {
    return ( 
        <div className="p-4 py-4 md:p-4 xl:p-6 flex flex-col gap-y-4">
            <div className="flex justify-center align-center md:hidden">
                <Suspense>
                    <SearchCatalog/>
                </Suspense>
            </div>
            {searchParams.title}
            {searchParams.categoryId}
        </div>
     );
}
 
export default CatalogPage;

