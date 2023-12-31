import { IconBrandGithub, IconLink } from "@tabler/icons-react";


export default function Header() {
  return (
    <div className="bg-white w-full max-w-screen-lg py-6 flex flex-col items-center md:flex-row gap-4">
      <div className="flex items-center flex-1">
        <IconLink color="#ffdb1e" />
        <div className="text-xl ml-1 font-bold">
          Bodhi Link Maker
        </div>
      </div>

      <a href={"https://github.com/gofenix/deno-news"} target="_blank" className="">
        <IconBrandGithub />
      </a>
    </div>
  );
}
