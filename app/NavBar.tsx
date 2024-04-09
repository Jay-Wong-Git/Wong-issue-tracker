"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugDuotone } from "react-icons/pi";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
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
              className={classNames({
                "text-zinc-500": link.href !== currentPath,
                "text-zinc-900": link.href === currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
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
