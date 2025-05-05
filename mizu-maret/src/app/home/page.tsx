import CarouselCustomNavigation from "@/components/carousel/custom-carousel";
import Footer from "@/components/footer";
import HeroImage from "@/components/hero/hero-image";
import React from "react";
import RecommendationAssets from "./_components/recomend-assets";
import RecommendationRoyality from "./_components/reccomendation-royality";

const HomePage = () => {
  return (
    <>
      <div className="m-12">
        <CarouselCustomNavigation />
        <HeroImage />
        <RecommendationAssets />
        <RecommendationRoyality />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
