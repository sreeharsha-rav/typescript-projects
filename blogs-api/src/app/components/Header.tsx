"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
  ];
  return (
    <header>
        <ul className="flex gap-5 py-10">
            {navItems.map((link, index) => (
                <li key={index}>
                    <Link href={link.path} className={pathname === link.path ? "text-blue-500 font-bold" : ""}>
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    </header>
  );
};

export default Header;