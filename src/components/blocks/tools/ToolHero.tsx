import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import AIWorkstation from "@/components/ui/ai-workstation";
import HappyUsers from "../happy-users";
import HeroBg from "../bg";
import { Hero as HeroType } from "@/types/blocks/hero";
import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";

export default function Hero({ hero }: { hero: HeroType }) {
  if (hero.disabled) {
    return null;
  }

  const highlightText = hero.highlight_text;
  let texts = null;
  if (highlightText) {
    texts = hero.title?.split(highlightText, 2);
  }

  return (
    <>
      <HeroBg />
      <section className="py-24 min-h-screen flex items-center">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[600px] relative">
            {/* Left Content */}
            <div className="flex flex-col justify-center relative z-0">
              {hero.show_badge && (
                <div className="flex items-center justify-start mb-8">
                  <img
                    src="/imgs/badges/phdaily.svg"
                    alt="phdaily"
                    className="h-10 object-cover"
                  />
                </div>
              )}
              
              <div className="text-left">
                {hero.announcement && (
                  <Link
                    href={hero.announcement.url as any}
                    className="mb-6 inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm hover:bg-slate-800/50 transition-colors"
                  >
                    {hero.announcement.label && (
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {hero.announcement.label}
                      </Badge>
                    )}
                    {hero.announcement.title}
                  </Link>
                )}

                {texts && texts.length > 1 ? (
                  <h1 className="mb-6 text-balance text-4xl font-bold lg:text-6xl xl:text-7xl leading-tight">
                    {texts[0]}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {highlightText}
                    </span>
                    {texts[1]}
                  </h1>
                ) : (
                  <h1 className="mb-6 text-balance text-4xl font-bold lg:text-6xl xl:text-7xl leading-tight">
                    {hero.title}
                  </h1>
                )}

                <p
                  className="mb-8 max-w-lg text-muted-foreground text-lg lg:text-xl leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: hero.description || "" }}
                />
                
                {hero.buttons && (
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                    {hero.buttons.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item.url as any}
                          target={item.target || ""}
                          className="flex items-center"
                        >
                          <Button
                            className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            size="lg"
                            variant={item.variant || "default"}
                          >
                            {item.icon && <Icon name={item.icon} className="mr-2" />}
                            {item.title}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                )}
                
                {hero.tip && (
                  <p className="mb-6 text-sm text-muted-foreground bg-slate-800/30 inline-block px-4 py-2 rounded-full border border-slate-700/30">
                    {hero.tip}
                  </p>
                )}
                
                {hero.show_happy_users && (
                  <div className="flex justify-center">
                    <HappyUsers />
                  </div>
                )}
              </div>
            </div>

            {/* Right Content - AI Workstation */}
            <div className="flex items-center justify-end h-full relative">
              <div className="h-[500px] flex items-center">
                {/* <AIWorkstation /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
