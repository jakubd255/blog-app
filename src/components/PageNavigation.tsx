import {Page} from "@/types";
import {Pagination, PaginationContent} from "./ui/pagination";
import getPaginationRange from "@/util/paginationRange";
import {useSearchParams} from "react-router-dom";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import {Button} from "./ui/button";



interface PageNavigationProps {
    page: Page;
}

const PageNavigation: React.FC<PageNavigationProps> = ({page}) => {
    const pageNumber = page.number+1;
    const array = getPaginationRange(page.totalPages, pageNumber, 5, 1);

    const [, setParams] = useSearchParams();

    const handlePageChange = (item: number | string) => {
        const params = new URLSearchParams();

        if(item === "N") {
            params.set("page", (pageNumber+5 > page.totalPages ? page.totalPages : pageNumber+5).toString())
        }
        else if(item === "P") {
            params.set("page", (pageNumber-5 < 1 ? 1 : pageNumber-5).toString())
        }
        else {
            params.set("page", item as string);
        }
        
        setParams(params);
    }

    return(
        <Pagination>
            <PaginationContent>
                <Button
                    onClick={() => handlePageChange(1)}
                    size="icon" 
                    variant="ghost" 
                    disabled={pageNumber == 1}
                >
                    <ChevronsLeft className="h-4 w-4"/>
                </Button>
                <Button
                    onClick={() => handlePageChange(pageNumber-1)}
                    size="icon" 
                    variant="ghost" 
                    disabled={pageNumber == 1}
                >
                    <ChevronLeft className="h-4 w-4"/>
                </Button>
                {array.map(item => (
                    <Button 
                        onClick={() => handlePageChange(item)} 
                        variant={pageNumber == item ? "default" : "ghost"}
                        size="icon" 
                    >
                        {["P", "N"].includes(item as string) ? "..." : item}
                    </Button>
                ))}
                <Button
                    onClick={() => handlePageChange(pageNumber+1)}
                    size="icon" 
                    variant="ghost" 
                    disabled={pageNumber == page.totalPages}
                >
                    <ChevronRight className="h-4 w-4"/>
                </Button>
                <Button
                    onClick={() => handlePageChange(page.totalPages)}
                    size="icon" 
                    variant="ghost" 
                    disabled={pageNumber == page.totalPages}
                >
                    <ChevronsRight className="h-4 w-4"/>
                </Button>
            </PaginationContent>
        </Pagination>
    );
}

export default PageNavigation;