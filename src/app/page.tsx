import { FilterSection } from "@/components/Section/FilterSection";
import { HeroSection } from "../components/Section/HeroSection";
import { PostSection } from "@/components/Section/PostSection";
import { GetInTouchSection } from "@/components/Section/GetInTouchSection";

interface HomeProps {
  searchParams: { page?: string };
}

export default function Home({ searchParams }: HomeProps) {
  const currentPage = (searchParams && Number(searchParams?.page)) || 1;

  return (
    <main className="">
      <img
        src="/svg/gradient.svg"
        className="absolute inset-0 -z-10 mx-auto w-full"
        alt=""
      />
      <HeroSection />
      <FilterSection />
      <PostSection page={currentPage} />
      <GetInTouchSection />
    </main>
  );
}
