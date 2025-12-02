import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { FloatingExcuseButton } from "../components/FloatingExcuseButton";



export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto py-12">
        <Hero />
        <Features />
        <Testimonials />
      </div>
      <Newsletter />
      <FloatingExcuseButton />

    </>
  );
}
