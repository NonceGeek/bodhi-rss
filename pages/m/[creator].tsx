import LinkCard from "@/components/LinkCard";
import { genCreatorLink, genLink } from "@/db/supabase";
import { LinkItem } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      <section className="w-full h-full flex flex-row justify-start items-start">
        <main className="w-full max-w-lg mx-auto my-auto ">
          {links.map((linkInfo) => {
            return (
              <div
                key={linkInfo.url}
                className={`flex justify-center items-center w-50 mt-3`}
              >
                <LinkCard link={linkInfo} key={linkInfo.url} />{" "}
              </div>
            );
          })}
        </main>
      </section>
    </>
  );
}
