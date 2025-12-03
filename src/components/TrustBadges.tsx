import kenyaMap1 from "@/assets/kenya-map-1.jpg";
import kenyaMap2 from "@/assets/kenya-map-2.jpg";
import kenyaMap3 from "@/assets/kenya-map-3.jpeg";

const maps = [
  { src: kenyaMap1, alt: "Kenya Map Infographic" },
  { src: kenyaMap2, alt: "Kenya Map with People" },
  { src: kenyaMap3, alt: "Kenya Population Map" },
];

export const TrustBadges = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground font-medium mb-8">
          Trusted by thousands of Kenyans and Lending Institutions.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {maps.map((map, index) => (
            <div
              key={index}
              className="w-40 h-32 md:w-48 md:h-36 rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <img
                src={map.src}
                alt={map.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};