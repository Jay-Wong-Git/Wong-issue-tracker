"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugDuotone } from "react-icons/pi";
import classNames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="px-5 py-4 mb-5 border-b h-15">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              <PiBugDuotone size="25" transform="rotate(-45)" />
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="cursor-pointer">
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    radius="full"
                    size="1"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
