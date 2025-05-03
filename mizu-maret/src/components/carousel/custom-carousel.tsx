"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

function CarouselCustomNavigation() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const carouselItems = [
    {
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      tagline: "Your Gateway to the World of NFTs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      tagline: "Where Digital Art Meets Ownership",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
      tagline: "Step into the Next Era of Digital Collectibles",
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay functionality with looping
  React.useEffect(() => {
    if (api && !isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (current === count - 1) {
          api.scrollTo(0);
        } else {
          api.scrollNext();
        }
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, isPaused, current, count]);

  const handleDotClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const handleNext = React.useCallback(() => {
    if (current === count - 1) {
      api?.scrollTo(0);
    } else {
      api?.scrollNext();
    }
  }, [api, current, count]);

  const handlePrevious = React.useCallback(() => {
    if (current === 0) {
      api?.scrollTo(count - 1);
    } else {
      api?.scrollPrev();
    }
  }, [api, current, count]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel setApi={setApi} className="rounded-3xl overflow-hidden mx-5 hover:cursor-pointer">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-110 w-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover rounded-3xl"
                />
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold py-2 px-4 rounded-lg mx-auto inline-block">
                    {item.tagline}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Custom navigation dots */}
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all ${
              current === i ? "w-10 bg-blue-500" : "w-4 bg-white/50"
            }`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselCustomNavigation;