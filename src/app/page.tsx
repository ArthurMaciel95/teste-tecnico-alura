import { FilterSection } from "@/components/Section/FilterSection";
import { HeroSection } from "../components/Section/HeroSection";
import { PostSection } from "@/components/Section/PostSection";
import { GetInTouchSection } from "@/components/Section/GetInTouchSection";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  return (
    <main id="main-content" className="">
      <img
        src="/svg/gradient.svg"
        className="absolute inset-0 -z-10 mx-auto w-full"
        alt="Elemento decorativo de fundo"
      />
      <HeroSection />
      <FilterSection />
      <PostSection page={currentPage} />
      <GetInTouchSection />
    </main>
  );
}
