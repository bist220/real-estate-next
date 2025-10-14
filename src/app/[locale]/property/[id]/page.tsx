import { getDictionary } from "@/app/lib/dictionaries";
import ViewProperty from "./ViewProperty";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <ViewProperty labels={dict} />
}
