import { authOptions } from "@/app/config/auth";
import { appRoutes } from "@/app/constants/routes";
import { loadingString } from "@/app/constants/strings";
import AuthPage from "@/app/modules/auth/AuthPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(appRoutes.home.index);
  }

  return (
    <div className="h-[100vh]">
      <Suspense fallback={<p>{loadingString}</p>}>
        <AuthPage />
      </Suspense>
    </div>
  );
};

export default page;
