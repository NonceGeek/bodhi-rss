import Header from '@/components/Header';
import LinkMaker from '@/components/LinkMaker';

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-screen-lg p-4">
        <Header></Header>
        <LinkMaker></LinkMaker>
        {/* <Footer /> */}
      </div>
    </>
  );
}
