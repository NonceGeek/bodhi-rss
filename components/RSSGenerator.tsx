import { Button } from '@/components/Button';
import ViewTypeSwitch from '@/components/ViewTypeSwitch';
import { genCreatorLink, genLink } from '@/db/supabase';
import { useViewType } from '@/hooks/useViewType';
import { LinkItem } from '@/types/index';
import { IconAsset, IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react';
import delay from 'delay';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LinkCard from './LinkCard';

const defaultHistory: LinkItem[] = [];

export default function LinkMaker() {
  const { viewType, toggleViewType } = useViewType();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<LinkItem[]>(defaultHistory);
  const [creator, setCreator] = useState('');
  const [rssAuthor, setRssAuthor] = useState('0x73c7448760517E3E6e416b2c130E3c6dB2026A1d');
  const [rssLimit, setRssLimit] = useState('20');
  const [rssGenerateBy, setRssGenerateBy] = useState('post');
  const [generatedRssUrl, setGeneratedRssUrl] = useState('');
  const [isRssUrlCopied, setIsRssUrlCopied] = useState(false);
  const [rssTitle, setRssTitle] = useState('');
  const [rssDescription, setRssDescription] = useState('');
  const [feedId, setFeedId] = useState('');
  const [userId, setUserId] = useState('');
  const [spaceId, setSpaceId] = useState('5');
  const [parentId, setParentId] = useState('15353');

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('history')!) || defaultHistory);
    setCreator(JSON.parse(localStorage.getItem('creator')!) || '');
  }, []);

  function removeLink(link: LinkItem) {
    const newHistory = history.filter((t) => t !== link);

    setHistory(newHistory);

    localStorage.setItem('history', JSON.stringify(newHistory));
  }

  const addLink = async () => {
    setLoading(true);

    try {
      const link = await genLink(url as unknown as number);
      if (!link) {
        alert('bodhi article id not found');
        return;
      }
      const newHistory = [...history, link];
      setHistory(newHistory);

      localStorage.setItem('history', JSON.stringify(newHistory));
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

  const handleRssGenerateByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setRssGenerateBy(newValue);
    if (newValue === 'space') {
      setRssAuthor('0xbeafc083600efc2376648bff353ce8a3ecaa1463');
    } else if (newValue === 'author') {
      setRssAuthor('0x73c7448760517E3E6e416b2c130E3c6dB2026A1d');
    } else if (newValue === 'post') {
      setRssAuthor('');
    }
  };

  const generateRssFeed = () => {
    let baseUrl = 'https://bodhi-data.deno.dev/';
    let params = new URLSearchParams();

    if (rssGenerateBy === 'author') {
      baseUrl += 'gen_rss';
      params.append('author', rssAuthor);
    } else if (rssGenerateBy === 'space') {
      baseUrl += 'gen_rss_by_space';
      params.append('space_addr', rssAuthor);
    } else if (rssGenerateBy === 'post') {
      baseUrl += 'gen_rss_by_post';
      params.append('space_id', spaceId);
      params.append('parent_id', parentId);
    }

    if (rssTitle) params.append('title', rssTitle);
    if (rssDescription) params.append('description', rssDescription);
    if (rssGenerateBy !== 'post') params.append('limit', rssLimit);

    const url = `${baseUrl}?${params.toString()}`;
    setGeneratedRssUrl(url);
  };

  const copyRssUrl = async () => {
    await navigator.clipboard.writeText(generatedRssUrl);
    setIsRssUrlCopied(true);
    setTimeout(() => setIsRssUrlCopied(false), 2000);
  };

  const addToRssFeed = async () => {
    try {
      const params = new URLSearchParams({
        addr: rssAuthor,
        type: rssGenerateBy,
        title: rssTitle,
        description: rssDescription,
        user_id: userId,
        feed_id: feedId
      });

      const response = await fetch(`https://bodhi-data.deno.dev/set_rss?${params.toString()}`);

      if (!response.ok) {
        console.error('Failed to add RSS feed:', response.statusText);
        throw new Error('Failed to add RSS feed');
      }

      const data = await response.json();
      console.log(data);

      if (data.message === 'RSS feed already verified') {
        alert('RSS feed already verified in the past!');
      } else {
        alert('RSS feed added successfully!');
      }
      // Optionally, you can update the UI or state here
    } catch (error) {
      console.error('Error adding RSS feed:', error);
      alert('Failed to add RSS feed. Please try again.');
    }
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
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Bodhi RSS Feed Generator</h2>
        <p className="my-4 text-center text-base text-gray-500">
          Input the information then generate the RSS feed.
        </p>

        <div className="flex flex-col items-center justify-start w-full max-w-md">
          <select
            className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
            value={rssGenerateBy}
            onChange={handleRssGenerateByChange}
          >
            <option value="post">Generate by Post</option>
            <option value="author">Generate by Author</option>
            <option value="space">Generate by Space</option>
          </select>

          <p className="mt-2 text-sm text-gray-600">
            {rssGenerateBy === 'post' && (
              <>
                💡Enter the Space ID and Post ID to generate an RSS feed for a specific post and its replies.<br />
                An Example: <a href="https://bodhi.wtf/space/5/15353" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://bodhi.wtf/space/5/15353</a>
              </>
            )}
            {rssGenerateBy === 'author' && (
              <>
                💡Enter the Bodhi creator address to generate an RSS feed for all posts by this author.<br />
                An Example: <a href="https://bodhi.wtf/address/0x73c7448760517E3E6e416b2c130E3c6dB2026A1d" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://bodhi.wtf/address/0x73c7448760517E3E6e416b2c130E3c6dB2026A1d</a>
              </>
            )}
            {rssGenerateBy === 'space' && (
              <>
                💡Enter the Bodhi space address to generate an RSS feed for all posts in this space.<br />
                An Example: <a href="https://bodhi.wtf/space/5" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://bodhi.wtf/space/5</a>
              </>
            )}
          </p>

          {rssGenerateBy === 'post' ? (
            <>
              <input
                type="text"
                className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
                placeholder="Enter Space ID"
                value={spaceId}
                onChange={(e) => setSpaceId(e.target.value)}
              />
              <input
                type="text"
                className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
                placeholder="Enter Parent ID"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              />
              <input
  type="text"
  className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
  placeholder="Enter RSS feed title (optional)"
  value={rssTitle}
  onChange={(e) => setRssTitle(e.target.value)}
/>
<input
  type="text"
  className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
  placeholder="Enter RSS feed description (optional)"
  value={rssDescription}
  onChange={(e) => setRssDescription(e.target.value)}
/>

            </>
          ) : (
            <input
              type="text"
              className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
              placeholder={`Enter Bodhi ${rssGenerateBy === 'author' ? 'creator address' : 'space address'}`}
              value={rssAuthor}
              onChange={(e) => setRssAuthor(e.target.value)}
            />
          )}
          {rssGenerateBy !== 'post' && (
            <input
              type="number"
              className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
              placeholder="Enter limit (default: 50)"
              value={rssLimit}
              onChange={(e) => setRssLimit(e.target.value)}
            />
          )}
          {rssGenerateBy === 'author' && (
            <>
              <input
                type="text"
                className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
                placeholder="Enter RSS feed title (optional)"
                value={rssTitle}
                onChange={(e) => setRssTitle(e.target.value)}
              />
              <input
                type="text"
                className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
                placeholder="Enter RSS feed description (optional)"
                value={rssDescription}
                onChange={(e) => setRssDescription(e.target.value)}
              />
            </>
          )}
          <Button
            className="btn mt-4 "
            onClick={generateRssFeed}
          >
            Generate RSS Feed
          </Button>
          {generatedRssUrl && (
            <div className="mt-4 w-full">
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <input
                  type="text"
                  readOnly
                  value={generatedRssUrl}
                  className="bg-transparent flex-grow mr-2 overflow-hidden text-ellipsis"
                />
                <button onClick={copyRssUrl} className="focus:outline-none">
                  {isRssUrlCopied ? (
                    <IconCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <IconCopy className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <br></br>
              <p>👇👇👇</p>
              <p className="inline-flex items-center">•⩊• Go to <a href="https://app.follow.is/discover?type=rss" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-1">Follow App</a> to Add Feed •⩊•</p>
              <p>add verification to claim your feed</p>
              <input
                type="text"
                className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
                placeholder="Enter Feed ID"
                value={feedId}
                onChange={(e) => setFeedId(e.target.value)}
              />
              <input
                type="text"
                className="focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) input mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <Button
                className="btn mt-4"
                onClick={addToRssFeed}
              >
                Add to RSS Feed For Verification
              </Button>
            </div>
          )}
        </div>
      </center>
    </>
  );
}
