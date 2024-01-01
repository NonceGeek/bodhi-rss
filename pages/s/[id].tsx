import LinkCard from '@/components/LinkCard';
import { genLink } from '@/db/supabase';
import { LinkItem } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Single() {
  const [linkInfo, setLinkInfo] = useState({} as LinkItem);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    genLink(id! as unknown as number).then((value) => {
      setLinkInfo(value!);
    });
  }, [id]);
  return (
    <>
      <meta name="referrer" content="no-referrer"></meta>
      <section className="flex h-full w-full flex-row items-start justify-start">
        <main className="mx-auto my-auto w-full max-w-lg ">
          <div className={`w-50 flex items-center justify-center`}>
            <LinkCard link={linkInfo} key={linkInfo.url} />
          </div>
        </main>
      </section>
    </>
  );
}
