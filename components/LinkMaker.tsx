"use client";

import { TbAsset as IconAsset } from "react-icons/tb";
import { Button } from "@/components/Button";
import Input from "@/components/Input";

import ViewTypeSwitch from "@/components/ViewTypeSwitch";
import { useViewType } from "@/hooks/useViewType";
import { Link } from "@/types/index";

import LinkCard from "./LinkCard";

import { db, genLink } from "@/db/supabase";
import { useEffect, useState } from "react";

const defaultHistory: Link[] = [
  {
    title: "fresh - The next-gen web framework.",
    description:
      "Just in time edge rendering, island based interactivity, and no configuration TypeScript support usi...",
    image: "https://fresh.deno.dev/home-og.png?__frsh_c=c5xfm6hjab90",
    url: "https://fresh.deno.dev/",
  },
  {
    title: "Deno — A modern runtime for JavaScript and TypeScript",
    description:
      "Deno is a simple, modern runtime for JavaScript and TypeScript that uses V8 and is built in Rust.",
    image: "https://deno.land/og/image.png",
    url: "https://deno.land",
  },
];

export default function LinkMaker() {
  const { viewType, toggleViewType } = useViewType();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const [history, setHistory] = useState<Link[]>(defaultHistory);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")!) || defaultHistory);
  }, []);

  function removeLink(link: Link) {
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

  return (
    <>
      <p className="my-4 text-center text-base text-gray-500">
        This is a link maker, you can input your bodhi article id and get a
        card-style preview.
      </p>
      <div className="flex flex-col items-center justify-start">
        <input
          type="text"
          className="p-2 w-full border-2 border-yellow-300 rounded-md text-lg mt-4 text-center duration-300 focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input"
          placeholder="pleace input your bodhi article id"
          value={url}
          onChange={(e) => {
            console.log((e.target as HTMLInputElement).value);
            setUrl((e.target as HTMLInputElement).value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addLink();
            }
          }}
        />
        <Button
          className="btn"
          loading={loading ? true : undefined}
          onClick={addLink}
        >
          <IconAsset className="w-6 h-6" />
          Make
        </Button>
      </div>

      <ViewTypeSwitch viewType={viewType} toggleViewType={toggleViewType} />

      <div className="mt-4 gap-4 grid grid-cols-1 sm:grid-cols-2">
        {history.map((item: Link, index: number) => {
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
