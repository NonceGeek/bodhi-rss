
// import LinkMaker from "../islands/LinkMaker.tsx";
import Header from '@/components/Header';
import LinkMaker from '@/components/LinkMaker';


export default function Home() {
  return (
    <>

      <div className="p-4 mx-auto max-w-screen-lg">
        <Header></Header>
        <LinkMaker></LinkMaker>
      </div>
    </>
  );
}
