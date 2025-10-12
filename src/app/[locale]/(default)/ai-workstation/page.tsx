import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FluxKontextWorkspace from "@/components/ui/ai-workstation";
import { auth } from "@/auth";
import { getUserCredits } from "@/services/credit";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ai_workstation");
  
  return {
    title: `${t("title")} - AI图像编辑与生成`,
    description: t("description"),
  };
}

export default async function AIWorkstationPage() {
  const t = await getTranslations("ai_workstation");
  
  // 获取当前用户会话
  const session = await auth();
  
  // 如果用户未登录，重定向到登录页面
  if (!session?.user?.uuid) {
    redirect("/auth/signin");
  }
  
  // 获取用户积分信息
  let userCredits = 0;
  let isPro = false;
  let isRecharged = false;
  
  try {
    const credits = await getUserCredits(session.user.uuid);
    userCredits = credits.left_credits;
    isPro = credits.is_pro || false;
    isRecharged = credits.is_recharged || false;
  } catch (error) {
    console.error("Failed to fetch user credits:", error);
    // 如果获取积分失败，显示错误提示而不是静默使用默认值
    // 这将通过 initialCredits=-1 来指示错误状态
    userCredits = -1;
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("description")}
        </p>
      </div>
      
      <FluxKontextWorkspace 
        initialCredits={userCredits}
        isPro={isPro}
        isRecharged={isRecharged}
      />
    </div>
  );
}
