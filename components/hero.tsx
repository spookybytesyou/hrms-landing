"use client"

import { useRef } from "react";
import { ArrowRight, Wifi } from "lucide-react";
import { LaserFlow } from "./LaserFlow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}
interface Buttons {
  primary?: Button;
  secondary?: Button;
}

interface HeroBasicProps {
  heading: string;
  description: string;
  buttons?: Buttons;
  image: Image;
  byline?: string;
  className?: string;
  icon?: React.ReactNode;
}

interface Hero115Props extends HeroBasicProps { }
type Props = Partial<Hero115Props>;

const defaultProps: Hero115Props = {
  heading: "Blocks Built With Shadcn & Tailwind",
  description: "Finely crafted components built with React, Tailwind and shadcn/ui. Developers can copy and paste these blocks directly into their project.",
  buttons: {
    primary: {
      text: "Browse Components",
      url: "https://shadcnblocks.com",
    },
    secondary: {
      text: "View GitHub",
      url: "https://shadcnblocks.com",
    },
  },
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png",
    srcDark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png",
    alt: "Hero Image Placeholder",
  },
  byline: "Trusted by 25,000+ businesses worldwide",
  icon: <Wifi className="size-6" />,
};

const Hero = (props: Props) => {
  const { icon, heading, description, buttons, image, byline, className } = {
    ...defaultProps,
    ...props,
  };

  const revealImgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', '-9999px');
      el.style.setProperty('--my', '-9999px');
    }
  };

  return (
    <section
      className={cn("relative overflow-hidden py-32", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 -z-10 bg-[#050508] overflow-hidden">
        <LaserFlow
          horizontalBeamOffset={0.06}
          verticalBeamOffset={0.025}
          color="#6398f5"
        />
        <img
          ref={revealImgRef}
          src="/hrms-hero.png"
          alt="Reveal effect background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            mixBlendMode: "lighten",
            opacity: 0.1,
            "--mx": "-9999px",
            "--my": "-9999px",
            WebkitMaskImage: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 80px, rgba(255,255,255,0.6) 180px, rgba(255,255,255,0.25) 280px, rgba(255,255,255,0) 360px)",
            maskImage: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 80px, rgba(255,255,255,0.6) 180px, rgba(255,255,255,0.25) 280px, rgba(255,255,255,0) 360px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          } as React.CSSProperties}
        />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col gap-5">
          <div className="relative isolate flex flex-col gap-5">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              {icon}
            </span>
            <h1 className="mx-auto max-w-xl text-center text-4xl font-semibold tracking-tight text-pretty md:text-5xl lg:max-w-3xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mx-auto max-w-5xl text-center text-lg text-balance text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="flex flex-col items-center gap-3 pt-3 pb-12">
              {buttons?.primary && (
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>
                    {buttons.primary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
              {byline && (
                <div className="text-center text-sm text-muted-foreground">
                  {byline}
                </div>
              )}
            </div>
          </div>
          {image.srcDark ? (
            <>
              <img
                src={image.src}
                alt={image.alt}
                className="mx-auto aspect-3/4 h-full max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top dark:hidden"
              />
              <img
                src={image.srcDark}
                alt={image.alt}
                className="mx-auto hidden aspect-3/4 h-full max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top dark:block"
              />
            </>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              className="mx-auto aspect-3/4 h-full max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero };
