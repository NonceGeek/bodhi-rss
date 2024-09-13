import { ViewType } from '@/hooks/useViewType';
import { LinkItem } from '@/types/index';

import Dropdown from '@/components/Dropdown';
import Modal from '@/components/Modal';
import {
  IconAppWindow,
  IconDots,
  IconLink,
  IconTrashX,
} from '@tabler/icons-react';
import { useState } from 'react';

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

  return `<iframe style="width:100%;height:100%;min-width:256px;" src="https://rss.rootmud.xyz/s/${id}" frameBorder="0"></iframe>`;
}

export default function LinkCard({
  type = 'image-up',
  showMenu = false,
  link,
  removeLink,
}: Props) {
  const { url, title, description, image } = link;
  const [showModal, setShowModal] = useState(false);
  const [embedCode, setEmbedCode] = useState('');

  const [items, setItems] = useState<MenuItem[]>([
    // {
    //   label: "download",
    //   value: "download",
    //   icon: <DownloadIcon size={20} color="gray"></DownloadIcon>,
    // },
    {
      label: 'embed',
      value: 'embed',
      icon: <IconAppWindow size={20} color="skyblue" />,
    },
    {
      label: 'remove',
      value: 'remove',
      icon: <IconTrashX size={20} color="red" />,
    },
  ]);

  const handleEmbed = () => {
    setShowModal(true);

    setEmbedCode(genEmbedCode(link));
  };

  const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleRemove = () => {
    removeLink?.(link);
  };

  return (
    <div
      className={`group relative flex w-full rounded-lg bg-white p-6 shadow-md ${
        type === 'image-up' ? 'flex-col' : 'flex-row'
      }`}
      data-url={url}
    >
      {showMenu && (
        <>
          <Dropdown
            className="absolute right-2 top-2 cursor-pointer text-sm text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
            icon={<IconDots />}
            items={items}
            onSelect={(item: MenuItem) => {
              switch (item.value) {
                case 'embed':
                  handleEmbed();
                  break;
                case 'remove':
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
              className="w-full rounded-lg border-2 border-gray-300 p-2"
              name="embed"
              readOnly
              value={embedCode}
              style={{ height: '120px' }}
            ></textarea>
          </Modal>
        </>
      )}

      {type === 'image-up' && (
        <>
          <img
            className="z-100 h-32 self-center object-cover"
            src={image!}
            width={'100%'}
            height={'100%'}
            alt=""
          />
          <div className="flex flex-col">
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <div className="my-2 flex-1 text-gray-600">{description}</div>
            <span className="font-xs inline-flex items-center text-gray-300 ">
              <IconLink size={16} />
              <a href={url} target="_blank">
                {url}
              </a>
            </span>
          </div>
        </>
      )}

      {type === 'image-left' && (
        <>
          <div className="w-1/3 flex-none">
            <img
              className="object-cover"
              src={image!}
              width={'100%'}
              height={'100%'}
              alt=""
            />
          </div>
          <div className="ml-4 flex-grow">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="my-2 flex-1 text-gray-600">{description}</div>
            <span className="font-xs inline-flex items-center text-gray-300">
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
