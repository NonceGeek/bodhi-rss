import { LinkItem } from '@/types/index';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log(supabaseUrl, supabaseKey);

export const db = createClient(supabaseUrl, supabaseKey);

export async function genLink(id: number): Promise<LinkItem | null> {
  const { data, error } = await db
    .from('bodhi_text_assets')
    .select('*')
    .eq('id_on_chain', id);

  if (error) {
    console.error(error);
    return null;
  }
  if (data.length < 1) {
    console.error('the data length is empty');
    return null;
  }

  const item: LinkItem = {
    title: data[0].id_on_chain,
    url: `https://bodhi.wtf/${data[0].id_on_chain}`,
    description: `${(data[0].content as string).substring(0, 100)}...`,
    image: '',
  };

  return item;
}

export async function genCreatorLink(
  address: string
): Promise<LinkItem[] | null> {
  const { data, error } = await db
    .from('bodhi_text_assets')
    .select('*')
    .eq('author_true', address.toLowerCase());

  if (error) {
    console.error(error);
    return null;
  }
  if (data.length < 1) {
    console.error('the data length is empty');
    return null;
  }

  const item: LinkItem[] = data.map((item) => {
    return {
      title: item.id_on_chain,
      url: `https://bodhi.wtf/${item.id_on_chain}`,
      description: `${(item.content as string).substring(0, 100)}...`,
      image: `https://picsum.photos/seed/${item.id_on_chain}/200`,
    };
  });

  return item;
}
