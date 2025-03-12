import Link from "next/link";

interface PostTagsListProps {
    tags: string[] | null;
}

export default function PostTagsList({tags}: PostTagsListProps) {
    return(
        <div className="flex gap-3">
            {tags?.map(tag => (
                <Link 
                    href={`/tags/${tag}`} 
                    key={tag} 
                    className="hover:underline text-sm"
                >
                    #{tag}
                </Link>
            ))}
        </div>
    );
}