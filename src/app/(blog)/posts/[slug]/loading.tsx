import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
    return(
        <div className="flex flex-col gap-5 mb-10">
            <Skeleton className="w-full h-[54px]"/>
            <Skeleton className="w-full max-w-[300px] h-[24px]"/>
            <Skeleton className="w-full max-w-[100px] h-[24px]"/>
            <Skeleton className="w-full max-w-[500px] h-[42px]"/>
            <Skeleton className="w-full h-[200px]"/>
            <Skeleton className="w-full max-w-[400px] h-[42px]"/>
            <Skeleton className="w-full h-[300px]"/>
        </div>
    );
}