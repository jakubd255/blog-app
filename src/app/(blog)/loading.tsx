import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
    return(
        <div className="flex flex-col gap-4">
            <Skeleton className="w-full max-w-[300px] h-[40px]"/>
            <Skeleton className="w-full h-[80px]"/>
            <Skeleton className="w-full h-[80px]"/>
            <Skeleton className="w-full h-[80px]"/>
            <Skeleton className="w-full h-[80px]"/>
            <Skeleton className="w-full h-[80px]"/>
            <Skeleton className="w-full h-[80px]"/>
            <Skeleton className="w-full h-[80px]"/>
        </div>
    );
}