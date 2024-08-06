import Footer from "@/components/LandingPageComponents/Footer";
import Header from "@/components/LandingPageComponents/Header";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import Testimonial from "@/components/LandingPageComponents/Testimonial";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Header />
            {/* <main className="flex min-h-screen flex-col justify-between"> */}
            <HeroSection />
            {/* </main> */}

            <Testimonial />

            <Footer />
        </>
    );
}
