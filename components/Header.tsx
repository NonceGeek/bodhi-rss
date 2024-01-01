import { IconBrandGithub, IconLink } from '@tabler/icons-react';

export default function Header() {
  return (
    <div className="flex w-full max-w-screen-lg flex-col items-center gap-4 bg-white py-6 md:flex-row">
      <div className="flex flex-1 items-center">
        <IconLink color="#ffdb1e" />
        <div className="ml-1 text-xl font-bold">Bodhi Link Maker</div>
      </div>

      <a
        href={'https://github.com/gofenix/deno-news'}
        target="_blank"
        className=""
      >
        <IconBrandGithub />
      </a>
    </div>
  );
}
