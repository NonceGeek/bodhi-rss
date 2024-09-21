import {
  IconBrandGithub,
  IconBrandTwitter,
  IconLink,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex w-full max-w-screen-lg flex-col items-center gap-4 bg-white py-6 md:flex-row">
      <div className="flex flex-1 items-center">
        <IconLink color="#ffdb1e" />
        <div className="ml-1 text-xl font-bold">Bodhi RSS</div>
      </div>
      <div className="w-full">
        <nav className="flex justify-center space-x-4">
          <Link href="/" className="hover:text-cyan-600">RSS Generator</Link>
          <Link href="https://github.com/NonceGeek/bodhi-rss/discussions/categories/awesome-rss" className="hover:text-cyan-600">Awesome RSS Feeds</Link>
          <Link href="/link-maker" className="hover:text-cyan-600">Link Maker</Link>
        </nav>
      </div>
      <div className="flex items-center">
        <a
          href="https://bodhi.wtf/space/5/15370?action=buy"
          target="_blank"
          className="rounded border hover:bg-cyan-200"
        >
          <img width="180" height="18" src="donation.png" alt="Made by Fenix" />
        </a>
        {/* <a href="https://bodhi.wtf/13714" target="_blank">
          <img width="180" height="18" src="logo.png" alt="Made by Fenix" />
        </a> */}
        <a
          href={'https://github.com/NonceGeek/bodhi-rss'}
          target="_blank"
          className="p-1"
        >
          <IconBrandGithub />
        </a>
        <a href={'https://twitter.com/0xleeduckgo'} target="_blank" className="p-1">
          <IconBrandTwitter />
        </a>
      </div>
    </div>
  );
}
