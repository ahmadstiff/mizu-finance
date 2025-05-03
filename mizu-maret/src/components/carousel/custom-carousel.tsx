"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

import carousel1 from "@/../public/carousel/mizumaret_comes_to_pharos.png"
import carousel2 from "@/../public/carousel/pharos_x_mizumaret.png"
import carousel3 from "@/../public/carousel/mizumaret_ada_gedungnya.png"

function CarouselCustomNavigation() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const carouselItems = [
    {
      image:
        carousel1,
      tagline: "",
    },
    {
      image:
        carousel2,
      tagline: "",
    },
    {
      image:
        carousel3,
      tagline: "",
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
              <div className="relative h-[80vh] w-full">
                <img
                  src={item.image.src || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover rounded-3xl"
                />
                <div className="absolute bottom-8 left-0 right-0 text-center">
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
            className={`block h-1 cursor-pointer rounded-2xl transition-all ${current === i ? "w-10 bg-blue-500" : "w-4 bg-white/50"
              }`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselCustomNavigation;