import Link from "next/link";

export default function BlogTitle() {
    return(
        <Link href="/">
            <h1 className="text-3xl hover:underline">
                Blog App
            </h1>
        </Link>
    );
}