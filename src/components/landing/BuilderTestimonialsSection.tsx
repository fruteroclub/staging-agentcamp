import * as React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  { id: "0", name: "Moises Cisneros", project: "Know the Score" },
  { id: "1", name: "Hugo Aracena", project: "Spotlight" },
  { id: "2", name: "Diego Mancera", project: "Nitedcrypto" },
  { id: "3", name: "Vianey Alvarez", project: "Goga" },
  { id: "4", name: "Roman Scarf", project: "Nard.chat Miniapp" },
  { id: "5", name: "Disidente", project: "Vendor Wars" },
  { id: "6", name: "Atilio", project: "Like2Win" },
  { id: "7", name: "Soxavisual", project: "La Blocka" },
  { id: "8", name: "Luis Fernando Wolfcito", project: "Universal Rate" },
  { id: "9", name: "Vianey Andrade", project: "nard.chat" },
] as const;

// Preserved for later when video delivery is stable again.
const PARKED_VIDEO_TESTIMONIALS = [
  {
    name: "Moises Cisneros",
    project: "Know the Score",
    videoUrl:
      "https://storage.tally.so/private/Experiencia-de-Verano-en-Cadena.mp4?id=OJ0Mdk&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik9KME1kayIsImZvcm1JZCI6IjN5QjhhOCIsImlhdCI6MTc3NzMyMTYwNH0.7yzuC11H3Hl4alghy2pnEq7G8S2ZWBV4BhkUQ7VYFfQ&signature=ead586089fe2c99b4a16b8372ca555ec73775b57c897e4c1f9c6af2fd742ff99",
  },
  {
    name: "Hugo Aracena",
    project: "Spotlight",
    videoUrl:
      "https://storage.tally.so/private/WhatsApp-Video-2025-09-13-at-12.35.57-PM.mp4?id=LJOp8J&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkxKT3A4SiIsImZvcm1JZCI6IjN5QjhhOCIsImlhdCI6MTc3NzMyMTYwNH0.Kbb2COoB8I2V2o-lrKoZxqGf2r-4T2lQpdq3EqqNHiM&signature=1a9c3274c30ff38af6e9c7fca1fc3978cc1708493617796f1a6252f43e8d8f03",
  },
  {
    name: "Diego Mancera",
    project: "Nitedcrypto",
    videoUrl:
      "https://storage.tally.so/private/0905.mp4?id=o7BPXM&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im83QlBYTSIsImZvcm1JZCI6IjN5QjhhOCIsImlhdCI6MTc3NzMyMTYwNH0.39TBJhsY8BRRj5JsFQtS96ZC6f6Dfr2xegn0wkYTqBE&signature=7e8132c3967e92b3d19837cc24a5ae88d9f3f87c675c3737a70ee1eb1e0f718a",
  },
  {
    name: "Vianey Alvarez",
    project: "Goga",
    videoUrl:
      "https://storage.tally.so/private/IMG_3498.mov?id=EJ701o&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkVKNzAxbyIsImZvcm1JZCI6IjN5QjhhOCIsImlhdCI6MTc3NzMyMTYwNH0.65d9z4C0CFn9w6fwrDqf0BQe1nH2qvD27Sxv8w2n6es&signature=95ef0de732a68cac60430314fc662e83cba29dcf6c72ed016f1334085a9a96df",
  },
  {
    name: "Roman Scarf",
    project: "Nard.chat Miniapp",
    videoUrl: "https://www.youtube.com/watch?v=aDfxCt5TWR4&ab_channel=LaBlocka%E3%8A%90",
  },
] as const;

export function BuilderTestimonialsSection() {
  const { t, i18n } = useTranslation();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
        return;
      }

      api.scrollTo(0);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="absolute top-1/4 left-1/4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animationKey={i18n.language} className="text-center mb-14">
            <div className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("testimonials.eyebrow")}
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.01em] mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              {t("testimonials.subtitle")}
            </p>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: false }}
              className="mx-auto"
            >
              <CarouselContent>
                {TESTIMONIALS.map((item, index) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 xl:basis-1/3">
                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-primary/20 p-6 shadow-2xl shadow-primary/10">
                      <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
                      <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-accent/10 blur-3xl" />

                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/10">
                            <Quote className="h-6 w-6 text-warning" />
                          </div>
                          <span className="rounded-full border border-white/10 bg-background/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {t("testimonials.labels.program")}
                          </span>
                        </div>

                        <p className="mb-6 flex-1 text-lg font-medium leading-[1.55] text-foreground">
                          "{t(`testimonials.items.${item.id}.quote`)}"
                        </p>

                        <div className="mb-5 h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />

                        <div>
                          <p className="text-base font-semibold text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.project} · {t("testimonials.labels.program")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-8 flex items-center justify-center gap-2">
                {TESTIMONIALS.map((dot, dotIndex) => (
                  <button
                    key={dot.id}
                    type="button"
                    aria-label={`Go to testimonial ${dotIndex + 1}`}
                    onClick={() => api?.scrollTo(dotIndex)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      current === dotIndex
                        ? "w-10 bg-warning"
                        : "w-2.5 bg-white/20 hover:bg-white/40",
                    )}
                  />
                ))}
              </div>
            </Carousel>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
