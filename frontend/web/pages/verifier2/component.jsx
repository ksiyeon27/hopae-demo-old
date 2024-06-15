import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  const useDeepLink = () => {
    const url = backendHostingURL + "/verifier/vp/career"; // verifier 2 backend
    const nonceUrl = backendHostingURL + "/verifier/nonce/career"; // 대신 서버에서 가져와야함
    const fields = ["name", "age"];
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

  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className={`w-full ${isDarkMode ? "dark" : ""}`}>
      <header className="bg-white shadow-sm dark:bg-gray-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-50"
            prefetch={false}
          >
            <HeartIcon className="h-6 w-6" />
            Matrimony
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="#"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              prefetch={false}
            >
              Genetic Info
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full">
              <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              className="rounded-full"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </header>
      <main>
        <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-gray-50">
                  Find Your Perfect Match
                </h1>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  Our advanced genetic matching algorithm helps you find your soulmate.
                </p>
                <div className="flex items-center gap-4">
                  <Button onClick={useDeepLink}>{"유전자 정보 제출하기"}</Button>

                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Learn More
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width={600}
                height={400}
                alt="Matrimony"
                className="mx-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-950 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <img
                src="/placeholder.svg"
                width={600}
                height={400}
                alt="Genetic Info"
                className="mx-auto rounded-xl object-cover"
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-50">
                  Submit Your Genetic Info
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  Our advanced genetic matching algorithm helps you find your perfect match.
                </p>
                <Button href="genetic-info-app://submit" className="w-full md:w-auto">
                  Submit Genetic Info
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">Company</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    About
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Pricing
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Contact
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">Resources</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    FAQ
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Blog
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Terms of Service
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">Social</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Twitter
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Instagram
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Facebook
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">Contact</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    info@matrimony.com
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    +1 (234) 567-890
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    123 Main St, Anytown USA
                    <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
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
  )
}


function MoonIcon(props) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function SunIcon(props) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}