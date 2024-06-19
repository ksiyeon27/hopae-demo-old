import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { backendHostingURL } from "@/common/config";

export default function Component() {
  const useDeepLink = () => {
    const url = backendHostingURL + "/issuer/vc/career"; // issuer 1 backend
    const nonceUrl = backendHostingURL + "/issuer/nonce/career"; // 대신 서버에서 가져와야함
    window.open("wwwallet://issue?url=" + url + "&nonceUrl=" + nonceUrl);
  };

  return (
    <div>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Collapsible className="grid gap-4">
                <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                  Company
                  <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="-mx-6 grid gap-6 bg-gray-100 p-6 dark:bg-gray-800">
                    <Link
                      href="#"
                      className="group grid h-auto w-full justify-start gap-1"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        About Us
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Learn more about our company.
                      </div>
                    </Link>
                    <Link
                      href="#"
                      className="group grid h-auto w-full justify-start gap-1"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Our Team
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Meet the people behind the company.
                      </div>
                    </Link>
                    <Link
                      href="/issuer1/issuance"
                      className="group grid h-auto w-full justify-start gap-1"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        발급
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        월렛 앱으로 증명서를 발급받을 수 있습니다.
                      </div>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Products
              </Link>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-[150px]">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                        prefetch={false}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          About Us
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Learn more about our company.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                        prefetch={false}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Our Team
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Meet the people behind the company.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                        prefetch={false}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Certificates
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Request certificates from the company.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Products
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <div className="flex flex-col">
        <section className="bg-gradient-to-r from-[#6366F1] to-[#9333EA] py-12 px-4 flex flex-col items-center justify-center text-center text-white">
          <div className="max-w-3xl">
            <MountainIcon className="mx-auto h-10 w-10 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Acme Inc.</h1>
            <p className="text-base">
              Acme Inc. is a leading provider of innovative solutions that
              empower businesses to thrive in the digital age. With a focus on
              cutting-edge technology and exceptional customer service, we are
              dedicated to helping our clients achieve their goals.
            </p>
          </div>
        </section>
        <section className="bg-[#F3F4F6] py-12 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <RocketIcon className="h-10 w-10 mb-4 text-[#6366F1]" />
              <h2 className="text-xl font-bold mb-2">Innovation</h2>
              <p className="text-muted-foreground text-sm">
                We are committed to pushing the boundaries of what's possible,
                constantly exploring new technologies and ideas to deliver
                cutting-edge solutions.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <UsersIcon className="h-10 w-10 mb-4 text-[#9333EA]" />
              <h2 className="text-xl font-bold mb-2">Collaboration</h2>
              <p className="text-muted-foreground text-sm">
                We believe in the power of teamwork, fostering a culture of open
                communication and mutual respect to deliver the best results for
                our clients.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BoltIcon className="h-10 w-10 mb-4 text-[#10B981]" />
              <h2 className="text-xl font-bold mb-2">Agility</h2>
              <p className="text-muted-foreground text-sm">
                We are nimble and responsive, adapting quickly to changing
                market conditions and client needs to ensure we deliver
                exceptional value.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Products</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Acme Inc. offers a wide range of innovative products to help
                businesses thrive in the digital age.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F3F4F6] rounded-lg p-4">
                  <LaptopIcon className="h-7 w-7 mb-4 text-[#6366F1]" />
                  <h3 className="text-lg font-bold mb-2">Web Development</h3>
                  <p className="text-muted-foreground text-sm">
                    Our cutting-edge web development solutions help businesses
                    create stunning, responsive websites that engage customers
                    and drive results.
                  </p>
                </div>
                <div className="bg-[#F3F4F6] rounded-lg p-4">
                  <DatabaseIcon className="h-7 w-7 mb-4 text-[#9333EA]" />
                  <h3 className="text-lg font-bold mb-2">Data Analytics</h3>
                  <p className="text-muted-foreground text-sm">
                    Our advanced data analytics tools provide businesses with
                    valuable insights to make informed decisions and optimize
                    their operations.
                  </p>
                </div>
                <div className="bg-[#F3F4F6] rounded-lg p-4">
                  <CloudIcon className="h-7 w-7 mb-4 text-[#10B981]" />
                  <h3 className="text-lg font-bold mb-2">Cloud Solutions</h3>
                  <p className="text-muted-foreground text-sm">
                    Our cloud-based solutions offer businesses scalable, secure,
                    and cost-effective infrastructure to power their digital
                    transformation.
                  </p>
                </div>
                <div className="bg-[#F3F4F6] rounded-lg p-4">
                  <SmartphoneIcon className="h-7 w-7 mb-4 text-[#6366F1]" />
                  <h3 className="text-lg font-bold mb-2">Mobile Development</h3>
                  <p className="text-muted-foreground text-sm">
                    Our mobile development expertise helps businesses create
                    engaging, user-friendly apps that deliver exceptional
                    experiences to their customers.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Our talented team of experts is dedicated to delivering
                exceptional results for our clients.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F3F4F6] rounded-lg p-4 flex flex-col items-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold mt-4">John Doe</h3>
                  <p className="text-muted-foreground text-sm">CEO</p>
                </div>
                <div className="bg-[#F3F4F6] rounded-lg p-4 flex flex-col items-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold mt-4">Jane Smith</h3>
                  <p className="text-muted-foreground text-sm">CTO</p>
                </div>
                <div className="bg-[#F3F4F6] rounded-lg p-4 flex flex-col items-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold mt-4">Michael Roth</h3>
                  <p className="text-muted-foreground text-sm">
                    Lead Developer
                  </p>
                </div>
                <div className="bg-[#F3F4F6] rounded-lg p-4 flex flex-col items-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>ES</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold mt-4">Emily Sato</h3>
                  <p className="text-muted-foreground text-sm">
                    Product Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function BoltIcon(props) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function CloudIcon(props) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function DatabaseIcon(props) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function LaptopIcon(props) {
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
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function RocketIcon(props) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function SmartphoneIcon(props) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
