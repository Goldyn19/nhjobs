"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SideNav from "./SideNav";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className="border-b bg-white py-4 md:m-0 mx-4">
      {isOpen && (
        <SideNav sidebarToggle={toggleSideNav} sideBarStatus={isOpen} />
      )}
      <div className="container md:mx-auto  h-full flex justify-between md:space-x-0 space-x-5">
        <div className="flex align-middle">
          <Image
            src="/images/nhlogo.svg"
            alt="new horizons logo"
            height={40}
            width={230}
            className="h-auto w-auto"
          />
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <Image
                src="/images/default_user.png"
                alt=""
                height={40}
                width={40}
                className="h-auto w-auto rounded-full bg-black"
              />
            </PopoverTrigger>
            <PopoverContent className="bg-white w-[150px] flex flex-col justify-center">
              <Link href='/' className="text-center">My Profile</Link>
              <hr/>
              <Link href='/' className="text-center ">Logout</Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
