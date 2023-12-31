import { Button } from "@/components/Button";
import ViewTypeSwitch from "@/components/ViewTypeSwitch";
import { useViewType } from "@/hooks/useViewType";
import { LinkItem } from "@/types/index";
import LinkCard from "./LinkCard";
import { db, genCreatorLink, genLink } from "@/db/supabase";
import { useEffect, useState } from "react";
import { IconAsset, IconCheck, IconCopy } from "@tabler/icons-react";
import delay from "delay";
import Link from "next/link";

const defaultHistory: LinkItem[] = [

];

const genEmbedCode = (address: string) => {
  return `<iframe style="width:100%;height:100%;min-width:256px;" src="https://bodhi-link.vercel.app/m/${address}" frameBorder="0"></iframe>`;
};

export default function LinkMaker() {
  const { viewType, toggleViewType } = useViewType();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState<LinkItem[]>(defaultHistory);
  const [creator, setCreator] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")!) || defaultHistory);
    setCreator(JSON.parse(localStorage.getItem("creator")!) || "");
  }, []);

  function removeLink(link: LinkItem) {
    const newHistory = history.filter((t) => t !== link);

    setHistory(newHistory);

    localStorage.setItem("history", JSON.stringify(newHistory));
  }

  const addLink = async () => {
    setLoading(true);

    try {
      const link = await genLink(url as unknown as number);
      if (!link) {
        alert("bodhi article id not found");
        return;
      }
      const newHistory = [...history, link];
      setHistory(newHistory);

      localStorage.setItem("history", JSON.stringify(newHistory));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const makeLink = async () => {
    setLoading(true);

    try {
      if (!url) {
        alert("please input...");
        return;
      }
      const link = await genCreatorLink(url);
      if (!link) {
        alert("bodhi creator address not found");
        return;
      }
      const newHistory = [...link];
      setHistory(newHistory);
      setCreator(url);

      localStorage.setItem("history", JSON.stringify(newHistory));
      localStorage.setItem("creator", JSON.stringify(url));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleCopy = async () => {
    const embedCode = genEmbedCode(creator);
    copyToClipboard(embedCode);
    setIsCopied(true);

    delay(3000).then(() => {
      setIsCopied(false);
    });
  };

  return (
    <>
      <p className="my-4 text-center text-base text-gray-500">
        This is a link maker, you can input creator address and get a card-style
        preview.
      </p>

      <div className="flex flex-col items-center justify-start">
        <input
          type="text"
          className="p-2 w-full border-2 border-yellow-300 rounded-md text-lg mt-4 text-center duration-300 focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input"
          placeholder="pleace input your bodhi creator address"
          value={url}
          onChange={(e) => {
            console.log((e.target as HTMLInputElement).value);
            setUrl((e.target as HTMLInputElement).value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              makeLink();
            }
          }}
        />
        <Button
          className="btn"
          loading={loading ? true : undefined}
          onClick={makeLink}
        >
          <IconAsset className="w-6 h-6" />
          Make
        </Button>
      </div>

      <ViewTypeSwitch viewType={viewType} toggleViewType={toggleViewType} />

      <Link href={`/m/${creator}`} target="_blank">
        <div className="flex flex-row items-center justify-center my-4 text-center text-base text-gray-500">
          {creator}

          {creator ? (
            <button onClick={handleCopy}>
              {isCopied ? (
                <IconCheck className="w-6 h-6"></IconCheck>
              ) : (
                <IconCopy className="w-6 h-6"></IconCopy>
              )}
            </button>
          ) : null}
        </div>
      </Link>

      <div className="mt-4 gap-4 grid grid-cols-1 sm:grid-cols-2">
        {history.map((item: LinkItem, index: number) => {
          return (
            <LinkCard
              link={item}
              key={index}
              type={viewType}
              showMenu
              removeLink={removeLink}
            />
          );
        })}
      </div>
    </>
  );
}
