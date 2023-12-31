import { ViewType } from "@/hooks/useViewType";
import { LinkItem } from "@/types/index";

import Dropdown from "@/components/Dropdown";
import Modal from "@/components/Modal";
import { useState } from "react";
import { IconAppWindow, IconDots, IconLink, IconTrashX } from "@tabler/icons-react";
import Image from "next/image";

interface Props {
  type?: ViewType;
  showMenu?: boolean;
  link: LinkItem;
  removeLink?: (link: LinkItem) => void;
}

interface MenuItem {
  label: string;
  value: string;
  icon?: JSX.Element;
}

function genEmbedCode(link: LinkItem) {
  const id = link.title;

  return `<iframe style="width:100%;height:100%;min-width:256px;" src="https://bodhi-link.vercel.app/s/${id}" frameBorder="0"></iframe>`;
}

export default function LinkCard({
  type = "image-up",
  showMenu = false,
  link,
  removeLink,
}: Props) {
  const { url, title, description, image } = link;
  const [showModal, setShowModal] = useState(false);
  const [embedCode, setEmbedCode] = useState("");

  const [items, setItems] = useState<MenuItem[]>([
    // {
    //   label: "download",
    //   value: "download",
    //   icon: <DownloadIcon size={20} color="gray"></DownloadIcon>,
    // },
    {
      label: "embed",
      value: "embed",
      icon: <IconAppWindow size={20} color="skyblue" />,
    },
    {
      label: "remove",
      value: "remove",
      icon: <IconTrashX size={20} color="red" />,
    },
  ]);

  const handleEmbed = () => {
    setShowModal(true);

    setEmbedCode(genEmbedCode(link));
  };

  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleRemove = () => {
    removeLink?.(link);
  };

  return (
    <div
      className={`w-full relative flex bg-white rounded-lg shadow-md p-6 group ${
        type === "image-up" ? "flex-col" : "flex-row"
      }`}
      data-url={url}
    >
      {showMenu && (
        <>
          <Dropdown
            className="absolute top-2 right-2 text-sm text-gray-500 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
            icon={<IconDots />}
            items={items}
            onSelect={(item: MenuItem) => {
              switch (item.value) {
                case "embed":
                  handleEmbed();
                  break;
                case "remove":
                  handleRemove();
                  break;
                default:
                  break;
              }
            }}
          ></Dropdown>
          <Modal
            title="Embed"
            closeText="Copy"
            show={showModal}
            onClose={() => {
              copyToClipboard(embedCode);
              setShowModal(false);
            }}
          >
            <textarea
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
              name="embed"
              readOnly
              value={embedCode}
              style={{ height: "120px" }}
            ></textarea>
          </Modal>
        </>
      )}

      {type === "image-up" && (
        <>
          <img
            className="h-32 object-cover self-center z-100"
            src={image!}
            width={"auto"}
            alt=""
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mt-4">{title}</h2>
            <div className="text-gray-600 my-2 flex-1">{description}</div>
            <span className="inline-flex items-center text-gray-300 font-xs ">
              <IconLink size={16} />
              <a href={url} target="_blank">
                {url}
              </a>
            </span>
          </div>
        </>
      )}

      {type === "image-left" && (
        <>
          <div className="flex-none w-1/3">
            <img className="object-cover" src={image!} alt="" />
          </div>
          <div className="flex-grow ml-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="text-gray-600 my-2 flex-1">{description}</div>
            <span className="inline-flex items-center text-gray-300 font-xs">
              <IconLink size={16} />
              <a href={url} target="_blank">
                {url}
              </a>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
