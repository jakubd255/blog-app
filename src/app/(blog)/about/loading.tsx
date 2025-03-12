import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
    return(
        <div className="flex flex-col gap-10 items-center">
            <Skeleton className="w-[200px] h-[200px] rounded-full"/>
            <Skeleton className="w-full h-[500px]"/>
        </div>
    );
}