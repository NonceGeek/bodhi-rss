import LinkCard from '@/components/LinkCard';
import { genCreatorLink } from '@/db/supabase';
import { LinkItem } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Multi() {
  const [links, setLinks] = useState([] as LinkItem[]);
  const router = useRouter();
  const { creator } = router.query;

  useEffect(() => {
    if (!creator) {
      return;
    }
    genCreatorLink(creator as string).then((value) => {
      setLinks(value!);
    });
  }, [creator]);
  return (
    <>
      <meta name="referrer" content="no-referrer"></meta>
      <section className="flex h-full w-full flex-row items-start justify-start">
        <main className="mx-auto my-auto w-full max-w-lg ">
          {links.map((linkInfo) => {
            return (
              <div
                key={linkInfo.url}
                className={`w-50 mt-3 flex items-center justify-center`}
              >
                <LinkCard link={linkInfo} key={linkInfo.url} />{' '}
              </div>
            );
          })}
        </main>
      </section>
    </>
  );
}
