import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/icon";

export default function ToolsPage() {
  const t = useTranslations();

  const tools = [
    {
      title: t("calculator.cpm.title"),
      description: t("calculator.cpm.description"),
      url: "/tools/cpm-calculator",
      icon: "RiCalculatorLine",
      color: "bg-blue-500"
    },
    {
      title: t("calculator.cpa.title"),
      description: t("calculator.cpa.description"),
      url: "/tools/cpa-calculator",
      icon: "RiUserAddLine",
      color: "bg-green-500"
    },
    {
      title: t("calculator.cpc.title"),
      description: t("calculator.cpc.description"),
      url: "/tools/cpc-calculator",
      icon: "RiCursorLine",
      color: "bg-purple-500"
    },
    {
      title: t("calculator.ctr.title"),
      description: t("calculator.ctr.description"),
      url: "/tools/ctr-calculator",
      icon: "RiMouseLine",
      color: "bg-orange-500"
    },
    {
      title: t("calculator.roi.title"),
      description: t("calculator.roi.description"),
      url: "/tools/roi-calculator",
      icon: "RiTrendingUpLine",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Marketing Calculator Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional marketing calculation tools to help you optimize your advertising campaigns and measure performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.url as any}>
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={tool.icon} className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Need help choosing the right tool? Check out our{" "}
            <Link href="/docs" className="text-primary hover:underline">
              documentation
            </Link>{" "}
            for detailed guides.
          </p>
        </div>
      </div>
    </div>
  );
}