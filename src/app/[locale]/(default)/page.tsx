// import BackgroundGlow from "@/components/ui/background-glow";
import Branding from "@/components/blocks/branding";
import CTA from "@/components/blocks/cta";
import FAQ from "@/components/blocks/faq";
import Feature from "@/components/blocks/feature";
import Feature0 from "@/components/blocks/feature0";
import Feature1 from "@/components/blocks/feature1";
import Feature2 from "@/components/blocks/feature2";
import Feature3 from "@/components/blocks/feature3";
import Hero from "@/components/blocks/hero/Hero/index";
import HeroSection from "@/components/blocks/hero/HeroSection";
import AeroSection from "@/components/blocks/aero/AeroSection";
// import Pricing from "@/components/blocks/pricing";
import FeaturedCreations from "@/components/blocks/featured-creations";
import Showcase from "@/components/blocks/showcase";
import Stats from "@/components/blocks/stats";
import Testimonial from "@/components/blocks/testimonial";
import { getLandingPage } from "@/services/page";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getLandingPage(locale);

  // 可以通过环境变量或配置来切换Hero组件
  const useNewHero = process.env.NODE_ENV === 'development'; // 开发环境使用新Hero组件

  return (
    <>
      {/* <BackgroundGlow /> */}
      
      {/* AeroSection - 新的第一屏组件 */}
      <AeroSection />
      
      {/* CPM Calculator - 第一屏
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50 dark:from-orange-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              {t('hero_title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero_description')}
            </p>
          </div>
          <CPMCalculator />
        </div>
      </section> */}
      
      {/* 新的Hero切换组件 - 可以通过配置开启 */}
      {useNewHero ? (
        <HeroSection 
          initialMode="one"
          animationDuration={0.3}
          className="mb-12"
        />
      ) : (
        page.hero && <Hero hero={page.hero} />
      )}
      
      {page.branding && <Branding section={page.branding} />}
      
      {/* Feature0 - 3D轮盘展示组件 */}
      <Feature0 />
      
      {page.introduce && <Feature1 section={page.introduce} />}
      {page.benefit && <Feature2 section={page.benefit} />}
      {page.usage && <Feature3 section={page.usage} />}
      {page.feature && <Feature section={page.feature} />}
      {page.showcase && <Showcase section={page.showcase} />}
      {page.stats && <Stats section={page.stats} />}
      {/* {page.pricing && <Pricing pricing={page.pricing} />} */}
      <FeaturedCreations />
      {page.testimonial && <Testimonial section={page.testimonial} />}
      {page.faq && <FAQ section={page.faq} />}
      {page.cta && <CTA section={page.cta} />}
    </>
  );
}


