import {
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Component() {
  const pathname = usePathname() ?? "/proposal-gallery";

  return (
    <Navbar fluid className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <NavbarBrand href="/" className="flex items-center gap-2 ml-4">
        <Image
          src="/images/icon_64x64.png"
          width={100}
          height={40}
          className="h-10 w-16"
          alt="Logo"
        />
      </NavbarBrand>

      <div className="flex md:order-2 mr-4">
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink
          href="/"
          active={pathname === "/"}
          className="text-base sm:text-lg text-black"
        >
          HOME
        </NavbarLink>
        <NavbarLink
          href="/our-story"
          active={pathname === "/our-story"}
          className="text-base sm:text-lg text-black"
        >
          OUR STORY
        </NavbarLink>
        <NavbarLink
          href="/wedding-details"
          active={pathname === "/wedding-details"}
          className="text-base sm:text-lg text-black"
        >
          WEDDING DETAILS
        </NavbarLink>

        <Dropdown
          arrowIcon={true}
          inline
          label={
            <span
              className={`text-base sm:text-lg text-black cursor-pointer ${
                pathname.startsWith("/proposal-gallery") ||
                pathname.startsWith("/prenup-gallery") ||
                pathname.startsWith("/wedding-gallery")
                  ? "font-bold underline"
                  : ""
              }`}
            >
              GALLERY
            </span>
          }
        >
          <DropdownItem
            href="/proposal-gallery"
            className={`text-base sm:text-lg ${
              pathname === "/proposal-gallery"
                ? "font-semibold text-blue-600"
                : ""
            }`}
          >
            Proposal
          </DropdownItem>
          <DropdownItem
            href="/prenup-gallery"
            className={`text-base sm:text-lg ${
              pathname === "/prenup-gallery"
                ? "font-semibold text-blue-600"
                : ""
            }`}
          >
            Prenup
          </DropdownItem>
          <DropdownItem
            href="/wedding-gallery"
            className={`text-base sm:text-lg ${
              pathname === "/wedding-gallery"
                ? "font-semibold text-blue-600"
                : ""
            }`}
          >
            Wedding
          </DropdownItem>
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Component;
