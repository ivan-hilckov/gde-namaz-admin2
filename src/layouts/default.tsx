import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-1 gap-2">
        <span className="text-default-600 text-black text-[8px]">
          Разработано
        </span>
        <Link
          isExternal
          className="text-[8px]"
          href="https://github.com/abdusalamov"
        >
          @abdusalamov
        </Link>
        <Link
          isExternal
          className="text-[8px]"
          href="https://github.com/ivan-hilckov"
        >
          @ivan-hilckov
        </Link>
        <Link
          isExternal
          className="text-[8px]"
          href="https://github.com/iCreck"
        >
          @iCreck
        </Link>
      </footer>
    </div>
  );
}
