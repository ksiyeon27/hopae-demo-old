import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { backendHostingURL } from "@/common/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  const useDeepLink = () => {
    const url = backendHostingURL + "/verifier/vp/genetic-test"; // verifier 2 backend
    const nonceUrl = backendHostingURL + "/verifier/nonce/genetic-test"; // 대신 서버에서 가져와야함
    const fields = ["hair_loss_gene_heritability"];
    window.open(
      "wwwallet://verify?url=" +
        url +
        "&nonceUrl=" +
        nonceUrl +
        "&fields=" +
        fields.join(",")
    );
  };

  useEffect(() => {
    setInterval(() => {
      // check if the user is verified (polling)
    }, 1000);
  }, []);

  return (
    <div>
      <header className="bg-gray-900 text-white py-4 px-4 md:py-6 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Marriage Info</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="#" prefetch={false}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  About
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Genetic Information
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right">
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  Genetic Information
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
      </header>
      <main>
        <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-2 md:order-1">
                <img
                  src="/verifier2.jpg"
                  alt="Genetic Information"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="text-center md:text-left order-1 md:order-2">
                <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">
                  Genetic Information
                </h1>
                <p className="text-gray-600 mb-8 md:text-lg lg:text-xl">
                  Submit your genetic information to help us provide the best
                  marriage recommendations.
                </p>
                <Link
                  onClick={useDeepLink}
                  href="#"
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors duration-300 md:text-lg lg:text-xl"
                  prefetch={false}
                >
                  Submit Genetic Information
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-6 md:py-8 lg:py-10">
        <div className="container mx-auto text-center">
          &copy; 2023 Marriage Info. All rights reserved.
        </div>
      </footer>
    </div>
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
