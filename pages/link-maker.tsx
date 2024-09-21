import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LinkMaker from '@/components/LinkMaker';
// import RSSGenerator from '@/components/RSSGenerator';
export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-screen-lg p-4">
        <Header></Header>
        <LinkMaker></LinkMaker>
        <Footer />
      </div>
    </>
  );
}
