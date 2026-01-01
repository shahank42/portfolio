import * as React from "react";
import { CONTENT } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectType = keyof typeof CONTENT.hire.basePrices;

export function PricingCalculator() {
  const [projectType, setProjectType] = React.useState<ProjectType>("static");
  const [pages, setPages] = React.useState(1);
  const [features, setFeatures] = React.useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  const total = React.useMemo(() => {
    let price = CONTENT.hire.basePrices[projectType];
    price += (pages - 1) * CONTENT.hire.pagePrice;
    features.forEach((f) => {
      price +=
        CONTENT.hire.featurePrices[
          f as keyof typeof CONTENT.hire.featurePrices
        ] || 0;
    });
    return price;
  }, [projectType, pages, features]);

  return (
    <div className="flex flex-col border border-input border-b-0 bg-background/50 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-input">
        {/* Left Column: Project Type & Scale */}
        <div className="flex flex-col">
          <div className="p-6 lg:p-10 space-y-4">
            <h3 className="font-inter text-sm text-muted-foreground uppercase tracking-widest">
              01 // project type
            </h3>
            <div className="grid grid-cols-2 gap-px bg-input border border-input overflow-hidden">
              {(Object.keys(CONTENT.hire.basePrices) as ProjectType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={cn(
                      "p-4 text-left transition-all outline-none font-inter text-sm lowercase",
                      type === "ecommerce" && "col-span-2",
                      projectType === type
                        ? "bg-background text-primary font-medium shadow-[inset_0_0_0_1px_var(--color-primary)] z-10"
                        : "bg-background text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {type}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="w-full h-px bg-input" />

          <div className="p-6 lg:p-10 space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="font-inter text-sm text-muted-foreground uppercase tracking-widest">
                02 // scale
              </h3>
              <span className="font-zilla-slab text-3xl text-foreground leading-none">
                {pages}{" "}
                <span className="text-sm font-inter text-muted-foreground">
                  pages
                </span>
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full h-1 bg-input appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
            />
          </div>
        </div>

        {/* Right Column: Features */}
        <div className="p-6 lg:p-10 space-y-4">
          <h3 className="font-inter text-sm text-muted-foreground uppercase tracking-widest">
            03 // add-ons
          </h3>
          <div className="flex flex-col gap-px bg-input border border-input overflow-hidden">
            {Object.entries(CONTENT.hire.featurePrices).map(([key, price]) => (
              <button
                key={key}
                onClick={() => toggleFeature(key)}
                className={cn(
                  "flex items-center justify-between p-4 transition-all text-left group bg-background",
                  features.includes(key)
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-accent/30",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-3 h-3 border transition-colors",
                      features.includes(key)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground group-hover:border-foreground",
                    )}
                  />
                  <span className="font-inter text-sm lowercase">{key}</span>
                </div>
                <span className="font-inter text-xs tracking-wide opacity-60 font-mono">
                  +₹{price.toLocaleString("en-IN")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Cost Display & Action */}
      <div className="grid md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_300px] border-t border-input">
        <div className="p-6 lg:p-10 flex flex-col justify-center gap-2 bg-accent/5">
          <p className="text-muted-foreground font-inter uppercase tracking-widest text-[10px]">
            estimated investment
          </p>
          <p className="font-zilla-slab text-5xl lg:text-7xl text-foreground font-light tracking-tighter">
            ₹{total.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-muted-foreground font-inter uppercase tracking-widest opacity-50 mt-2">
            * estimate based on standard requirements.
          </p>
        </div>

        <a
          href={`mailto:hello@sh42.me?subject=project inquiry: ${projectType} (${pages} pages)&body=hi, i'm interested in a ${projectType} project with ${pages} pages and features: ${features.join(", ")}.`}
          className="flex items-center justify-center bg-transparent hover:bg-primary hover:text-primary-foreground text-foreground border-t md:border-t-0 md:border-l border-input transition-all ease-out duration-300 group relative overflow-hidden py-8 md:py-0"
        >
          <span className="font-zilla-slab text-2xl lg:text-3xl italic pr-2 z-10 group-hover:pr-4 transition-all">
            init()
          </span>
          <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
        </a>
      </div>
    </div>
  );
}
