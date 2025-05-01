import CarouselCustomNavigation from "@/components/carousel/custom-carousel";
import Footer from "@/components/footer";
import HeroImage from "@/components/hero/hero-image";
import React from "react";
import RecommendationAssets from "./_components/recomend-assets";

const HomePage = () => {
  return (
    <>
      <div className="mx-5">
        <CarouselCustomNavigation />
        <HeroImage />
        <RecommendationAssets />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
