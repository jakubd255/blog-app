import { getAdmin } from "@/db/queries/users";
import { unstable_cache } from "next/cache";

const settings = {tags: ["admin"], revalidate: 60};

export const getCachedAdmin = unstable_cache(
    getAdmin,
    ["admin"],
    settings
);