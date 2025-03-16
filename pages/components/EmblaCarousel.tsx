import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./DotButtons";

interface EmblaCarouselProps {
  children: React.ReactNode;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ children, step, setStep }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    direction: "ltr",
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(step);
    }
  }, [step, emblaApi]);

  const onDotClickHandler = (index: number) => {
    onDotButtonClick(index);
    setStep(index);
  };

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex flex-row gap-4">
        {children}
      </div>
      <div className="embla__controls">
        <div className="embla__dots flex flex-row gap-2 items-center justify-center my-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotClickHandler(index)}
              className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
