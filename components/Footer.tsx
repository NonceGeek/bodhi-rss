import { IconBrandGithub } from '@tabler/icons-react';

export default function Footer() {
  const menus = [
    {
      title: 'Documentation',
      children: [
        { name: 'Getting Started', href: '#' },
        { name: 'Guide', href: '#' },
        { name: 'API', href: '#' },
        { name: 'Showcase', href: '#' },
        { name: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Community',
      children: [
        { name: 'Forum', href: '#' },
        { name: 'Discord', href: '#' },
      ],
    },
  ];

  return (
    <div className="flex w-full max-w-screen-lg flex-col gap-8 bg-white px-8 py-8 text-sm md:flex-row md:gap-16">
      <div className="flex-1">
        <a href="https://github.com/gofenix" target="_blank">
          <img width="200" height="32" src="logo.png" alt="Made by Fenix" />
        </a>
        <a href="https://github.com/leeduckgo" target="_blank">
          <img width="200" height="32" src="logo_ldg.png" alt="Made by LeeDuckGo" />
        </a>
      </div>

      {menus.map((item) => (
        <div className="mb-4" key={item.title}>
          <div className="font-bold">{item.title}</div>
          <ul className="mt-2">
            {item.children.map((child) => (
              <li className="mt-2" key={child.name}>
                <a
                  className="text-gray-500 hover:text-gray-700"
                  href={child.href}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="space-y-2 text-gray-500">
        <div className="text-xs">
          Copyright © 2024 gofenix&leeduckgo
          <br />
          All right reserved.
        </div>

        <a
          href="https://github.com/NonceGeek/bodhi-rss"
          className="inline-block hover:text-black"
          aria-label="GitHub"
        >
          <IconBrandGithub aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
