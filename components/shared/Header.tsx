"use client";

import { useState } from "react";

const SITE_URL = "https://www.turismosinlimites.com.co";

const NAV_LINKS = [
  { label: "Inicio", href: `${SITE_URL}/` },
  { label: "Nosotros", href: `${SITE_URL}/nosotros/` },
  {
    label: "A donde ir",
    children: [
      { label: "Cachipay", href: `${SITE_URL}/cachipay/` },
      { label: "Anolaima", href: `${SITE_URL}/anolaima/` },
    ],
  },
  { label: "Contáctanos", href: `${SITE_URL}/contactanos/` },
  { label: "Revista Digital", href: `${SITE_URL}/revista-digital/` },
  { label: "Hospedajes Sin Límites", href: `${SITE_URL}/hospedajes1/` },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100086961954462",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.978h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/turismo_sinlimites/?next=%2F",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.69 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 1.802c-3.15 0-3.5.012-4.737.067-2.27.103-3.293 1.14-3.396 3.396-.055 1.237-.066 1.586-.066 4.737s.011 3.5.066 4.737c.103 2.254 1.123 3.293 3.396 3.396 1.237.055 1.586.067 4.737.067 3.15 0 3.5-.012 4.737-.067 2.268-.103 3.293-1.14 3.396-3.396.055-1.237.067-1.587.067-4.737s-.012-3.5-.067-4.737c-.103-2.255-1.124-3.292-3.396-3.396-1.237-.055-1.587-.067-4.737-.067zm0 3.064a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm6.538-3.205a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
      </svg>
    ),
  },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        {/* Logo */}
        <a
          href={`${SITE_URL}/`}
          className="shrink-0 text-xl font-bold tracking-tight text-[var(--color-brand-blue)]"
        >
          Turismo <span className="text-[var(--color-brand-text)]">Sin Límites</span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopDropdownOpen(true)}
                onMouseLeave={() => setDesktopDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-[var(--color-brand-text)] transition-colors hover:text-[var(--color-brand-blue)]"
                  aria-expanded={desktopDropdownOpen}
                >
                  {item.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {desktopDropdownOpen && (
                  <div className="absolute left-0 top-full min-w-[10rem] rounded-md border border-black/5 bg-[var(--color-surface)] py-1 shadow-lg">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[var(--color-brand-text)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-brand-blue)]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--color-brand-text)] transition-colors hover:text-[var(--color-brand-blue)]"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Social icons desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-[var(--color-brand-blue)] transition-opacity hover:opacity-70"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Botón menú mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-brand-blue)] md:hidden"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú mobile */}
      {mobileOpen && (
        <nav className="border-t border-black/5 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((item) =>
              "children" in item ? (
                <li key={item.label}>
                  <p className="text-sm font-semibold text-[var(--color-brand-text)]">{item.label}</p>
                  <ul className="mt-2 flex flex-col gap-2 border-l border-black/10 pl-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          className="text-sm text-[var(--color-brand-text)] hover:text-[var(--color-brand-blue)]"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-[var(--color-brand-text)] hover:text-[var(--color-brand-blue)]"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[var(--color-brand-blue)] transition-opacity hover:opacity-70"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
