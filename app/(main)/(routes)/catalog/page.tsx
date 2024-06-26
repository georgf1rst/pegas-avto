import { SearchCatalog } from "@/components/search-input";

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
        <div className="p-2 py-4 md:p-4 xl:p-6 flex flex-col gap-y-4">
            <div className="px-2 md:hidden">
                <SearchCatalog/>
                {searchParams.title}
            </div>
        </div>
     );
}
 
export default CatalogPage;

