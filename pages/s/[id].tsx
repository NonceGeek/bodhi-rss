import LinkCard from "@/components/LinkCard";
import { genLink } from "@/db/supabase";
import { LinkItem } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      <section className="w-full h-full flex flex-row justify-start items-start">
        <main className="w-full max-w-lg mx-auto my-auto ">
          <div className={`flex justify-center items-center w-50`}>
            <LinkCard link={linkInfo} key={linkInfo.url} />
          </div>
        </main>
      </section>
    </>
  );
}
