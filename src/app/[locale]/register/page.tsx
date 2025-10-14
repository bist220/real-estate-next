import { getDictionary } from "@/app/lib/dictionaries";
import { SignupForm } from "../../components/signup-form";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm labels={dict}/>
      </div>
    </div>
  )
}
