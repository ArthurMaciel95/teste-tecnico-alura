import { FilterSection } from "@/components/Section/FilterSection";
import { HeroSection } from "../components/Section/HeroSection";
import { PostSection } from "@/components/Section/PostSection";

export default function Home() {
  return (
    <main className="">
      <img
        src="/svg/gradient.svg"
        className="absolute inset-0 -z-10 mx-auto"
        alt=""
      />
      <HeroSection />
      <FilterSection />
      <PostSection />
    </main>
  );
}
