import { formatDate } from "@/lib/date";

interface PostDateProps {
    date: Date;
}

export default function PostDate({date}: PostDateProps) {
    return(
        <span className="text-muted-foreground">
            {formatDate(date)}
        </span>
    );
}