'use client';

import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-light.png" alt="Logo" width={40} height={40} />
        </Link>

        {/* Navigation */}
        <nav className="bg-black-100 rounded-full p-1">
          <ul className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-full hover:bg-purple-500 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
} 