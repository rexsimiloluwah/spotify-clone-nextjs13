"use client";
import { homepageData } from "@/data/home";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PlaylistCard from "./PlaylistCard";

const HomePageContent = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const container = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();

  console.log(session, status);

  useEffect(() => {
    const containerEl = container.current;

    const handleScroll = () => {
      if (containerEl) {
        const scrollY = containerEl.scrollTop;

        if (scrollY > 5) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }
      }
    };

    containerEl?.addEventListener("scroll", handleScroll);

    return () => {
      containerEl?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="md:max-h-[calc(100vh-120px)] overflow-y-auto relative"
      ref={container}
    >
      <Navbar isScrolling={isScrolling} />

      <div className="px-6 py-2">
        <section className="flex flex-col gap-y-6">
          {homepageData.map((item, id) => (
            <div key={id} className="flex flex-col gap-y-4">
              <h1 className="font-bold md:text-2xl">{item.title}</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
                {item.content.map(({ title, description, image }, id) => (
                  <PlaylistCard
                    key={id}
                    title={title}
                    description={description}
                    imageUrl={image}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-16">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default HomePageContent;
