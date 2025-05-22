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

export function Component() {
  return (
    <Navbar fluid className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <NavbarBrand href="/">
        <Image
          src="/images/icon_64x64.png"
          width={40}
          height={40}
          className="ml-5 h-8 w-13 sm:h-10 sm:w-15"
          alt="Logo"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active className="text-base sm:text-lg text-black">
          HOME
        </NavbarLink>
        <NavbarLink href="/our-story" className="text-base sm:text-lg text-black">
          OUR STORY
        </NavbarLink>
        <NavbarLink href="#" className="text-base sm:text-lg text-black">
          WEDDING DETAILS
        </NavbarLink>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <NavbarLink href="#" className="text-base sm:text-lg text-black">
              GALLERY
            </NavbarLink>
          }
        >
          <DropdownItem
            className="text-base sm:text-lg"
            href="/proposal-gallery"
          >
            Proposal
          </DropdownItem>
          <DropdownItem className="text-base sm:text-lg" href="/prenup-gallery">Prenup</DropdownItem>
          <DropdownItem className="text-base sm:text-lg">Wedding</DropdownItem>
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Component;
