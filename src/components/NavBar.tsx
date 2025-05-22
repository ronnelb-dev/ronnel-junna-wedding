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
      <NavbarBrand href="/" className="flex items-center gap-2 ml-4">
        <Image
          src="/images/icon_64x64.png"
          width={40}
          height={40}
          className="h-10 w-10"
          alt="Logo"
        />
      </NavbarBrand>

      <div className="flex md:order-2 mr-4">
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink href="/" active className="text-base sm:text-lg text-black">
          HOME
        </NavbarLink>
        <NavbarLink href="/our-story" className="text-base sm:text-lg text-black">
          OUR STORY
        </NavbarLink>
        <NavbarLink href="/wedding-details" className="text-base sm:text-lg text-black">
          WEDDING DETAILS
        </NavbarLink>

        <Dropdown
          arrowIcon={true}
          inline
          label={
            <span className="text-base sm:text-lg text-black cursor-pointer">
              GALLERY
            </span>
          }
        >
          <DropdownItem href="/proposal-gallery" className="text-base sm:text-lg">
            Proposal
          </DropdownItem>
          <DropdownItem href="/prenup-gallery" className="text-base sm:text-lg">
            Prenup
          </DropdownItem>
          <DropdownItem href="/wedding-gallery" className="text-base sm:text-lg">
            Wedding
          </DropdownItem>
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Component;
