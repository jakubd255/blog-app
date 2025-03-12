import Navbar from "@/components/navbar";

export default function BlogLayout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <>
            <Navbar/>
            <main className="max-w-[800px] w-full mx-auto mt-10 mb-5 px-3">
                {children}
            </main>
        </>
    );
}