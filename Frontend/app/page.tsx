import Header from "@/components/LandingPageComponents/Header";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      {/* <main className="flex min-h-screen flex-col justify-between"> */}
        <HeroSection />
      {/* </main> */}
    </>
  );
}
