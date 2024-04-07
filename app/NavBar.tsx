import Link from "next/link";
import React from "react";
import { PiBugDuotone } from "react-icons/pi";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 px-5 mb-5 border-b h-14 items-center">
      <Link href="/">
        <PiBugDuotone />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
