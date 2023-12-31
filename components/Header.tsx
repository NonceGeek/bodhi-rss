import { CiLink as LinkIcon } from "react-icons/ci";
import { FaGithub as  GithubIcon} from "react-icons/fa";

export default function Header() {
  return (
    <div className="bg-white w-full max-w-screen-lg py-6 flex flex-col items-center md:flex-row gap-4">
      <div className="flex items-center flex-1">
        <LinkIcon color="#ffdb1e" />
        <div className="text-xl ml-1 font-bold">
          Link Maker
        </div>
      </div>
      <a href="https://github.com/gofenix" target="_blank">
        <img
          width="200"
          height="32"
          src="logo.png"
          alt="Made by Fenix"
        />
      </a>
      <a href={"https://github.com/gofenix/deno-news"} target="_blank" className="">
        <GithubIcon />
      </a>
    </div>
  );
}
