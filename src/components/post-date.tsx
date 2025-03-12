interface PostDateProps {
    date: Date;
}

export default function PostDate({date}: PostDateProps) {
    return(
        <span className="text-muted-foreground">
            {date.toLocaleDateString()}
        </span>
    );
}