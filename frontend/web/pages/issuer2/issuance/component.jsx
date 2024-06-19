import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { backendHostingURL } from "@/common/config";

export default function Component() {
  const useDeepLink = () => {
    const url = backendHostingURL + "/issuer/vc/genetic-test"; // issuer 2 backend
    const nonceUrl = backendHostingURL + "/issuer/nonce/genetic-test"; // 대신 서버에서 가져와야함
    window.open("wwwallet://issue?url=" + url + "&nonceUrl=" + nonceUrl);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow dark:bg-gray-900 py-4">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link href="/issuer2" className="flex items-center" prefetch={false}>
            <DnaIcon className="h-6 w-6 text-indigo-500" />
            <span className="ml-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Genoma Insights
            </span>
          </Link>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="#" prefetch={false}>
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" prefetch={false}>
                    Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" prefetch={false}>
                    Issuance of Genetic Test Results
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" prefetch={false}>
                    Contact
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Issuance of your genetic results
              </h1>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                Access your comprehensive genetic insights with ease.
              </p>
              <Link
                onClick={useDeepLink}
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-md bg-indigo-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300"
                prefetch={false}
              >
                Issuance of my genetic results
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Genoma Insights. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function DnaIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
      <path d="m6.5 12.5 1 1" />
      <path d="m16.5 10.5 1 1" />
      <path d="m10 16 1.5 1.5" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
