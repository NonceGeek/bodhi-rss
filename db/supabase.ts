
import { LinkItem } from "@/types/index";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ttsogebedhkttgyrgjtc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0c29nZWJlZGhrdHRneXJnanRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4Njg0NzIsImV4cCI6MjAxODQ0NDQ3Mn0.vmSns6cwl5qdq7I3Zgg4hpr1h4_m3OnBq06OENsP7VI";

export const db = createClient(supabaseUrl, supabaseKey);

export async function genLink(id: number): Promise<LinkItem | null> {
  const { data, error } = await db.from("bodhi_text_assets").select("*").eq(
    "id_on_chain",
    id,
  );

  if (error) {
    console.error(error);
    return null;
  }
  if (data.length < 1) {
    console.error("the data length is empty");
    return null;
  }

  const item: LinkItem = {
    title: data[0].id_on_chain,
    url: `https://bodhi.wtf/${data[0].id_on_chain}`,
    description: `${(data[0].content as string).substring(0, 100)}...`,
    image: "",
  };

  return item;
}

export async function genCreatorLink(address: string): Promise<LinkItem[] | null> {
  const { data, error } = await db.from("bodhi_text_assets").select("*").eq(
    "creator",
    address,
  );

  if (error) {
    console.error(error);
    return null;
  }
  if (data.length < 1) {
    console.error("the data length is empty");
    return null;
  }

  const item: LinkItem[] = data.map((item) => {
    return {
      title: item.id_on_chain,
      url: `https://bodhi.wtf/${item.id_on_chain}`,
      description: `${(item.content as string).substring(0, 100)}...`,
      image: "",
    };
  })

  return item;
}
