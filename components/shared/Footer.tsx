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
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@turismosinlimites",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M16.6 5.82a4.28 4.28 0 01-2.07-3.42h-2.95v13.07a2.6 2.6 0 11-1.84-2.49V9.92a5.55 5.55 0 102.95 4.9V8.35a7.2 7.2 0 003.91 1.16V6.55a4.27 4.27 0 01-2-.73z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-brand-blue)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center">
        <p className="text-xl font-bold tracking-tight">Turismo Sin Límites</p>
        <p className="text-sm italic text-white/90">Más para ver y ser visto</p>

        <div className="flex flex-col items-center gap-1 text-sm text-white/90">
          <p>Cachipay – Cundinamarca – Colombia</p>
          <p>(+57) 300 7186897</p>
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white transition-opacity hover:opacity-70"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="mt-2 text-xs text-white/70">
          Copyright © Turismo Sin Límites {year}
        </p>
      </div>
    </footer>
  );
}
