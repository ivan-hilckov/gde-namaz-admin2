import { ThemeSwitch } from "@/components/theme-switch";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Navbar as NextUINavbar } from "@nextui-org/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </NextUINavbar>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-1 gap-2" />
    </div>
  );
}
