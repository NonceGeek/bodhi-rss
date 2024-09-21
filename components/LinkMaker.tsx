import { Button } from '@/components/Button';
import ViewTypeSwitch from '@/components/ViewTypeSwitch';
import { genCreatorLink } from '@/db/supabase';
import { useViewType } from '@/hooks/useViewType';
import { LinkItem } from '@/types/index';
import { IconAsset, IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react';
import delay from 'delay';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LinkCard from './LinkCard';

const defaultHistory: LinkItem[] = [];

const genEmbedCode = (address: string) => {
  return `<iframe style="width:100%;height:100%;min-width:256px;" src="https://rss.rootmud.xyz/m/${address}" frameBorder="0"></iframe>`;
};

export default function LinkMaker() {
  const { viewType, toggleViewType } = useViewType();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<LinkItem[]>(defaultHistory);
  const [creator, setCreator] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('history')!) || defaultHistory);
    setCreator(JSON.parse(localStorage.getItem('creator')!) || '');
  }, []);

  function removeLink(link: LinkItem) {
    const newHistory = history.filter((t) => t !== link);

    setHistory(newHistory);

    localStorage.setItem('history', JSON.stringify(newHistory));
  }

  const makeLink = async () => {
    setLoading(true);

    try {
      if (!url) {
        alert('please input...');
        return;
      }
      const link = await genCreatorLink(url);
      if (!link) {
        alert('bodhi creator address not found');
        return;
      }
      const newHistory = [...link];
      setHistory(newHistory);
      setCreator(url);

      localStorage.setItem('history', JSON.stringify(newHistory));
      localStorage.setItem('creator', JSON.stringify(url));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
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
      <center>
        <Button
          className="btn !bg-blue-300 hover:bg-blue-400 text-white"
          onClick={() => window.open('https://bodhi.wtf', '_blank')}
        >
          <IconExternalLink className="h-6 w-6" />
          Visit Bodhi
        </Button>
        <br></br>
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Embed Page Generator</h2>
      </center>
      <p className="my-4 text-center text-base text-gray-500">
        Input creator address and get a card-style preview.
      </p>

      <div className="flex flex-col items-center justify-start">
        <input
          type="text"
          className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
          placeholder="pleace input your bodhi creator address"
          value={url}
          onChange={(e) => {
            console.log((e.target as HTMLInputElement).value);
            setUrl((e.target as HTMLInputElement).value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              makeLink();
            }
          }}
        />
        <div className="flex space-x-2">
          <Button
            className="btn"
            loading={loading ? true : undefined}
            onClick={makeLink}
          >
            <IconAsset className="h-6 w-6" />
            Make
          </Button>
        </div>
      </div>

      <ViewTypeSwitch viewType={viewType} toggleViewType={toggleViewType} />

      <div className="my-4 flex flex-row items-center justify-center text-center text-base text-gray-500">
        <Link href={`/m/${creator}`} target="_blank">
          {creator}
        </Link>

        {creator ? (
          <button onClick={handleCopy}>
            {isCopied ? (
              <IconCheck className="h-6 w-6"></IconCheck>
            ) : (
              <IconCopy className="h-6 w-6"></IconCopy>
            )}
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
