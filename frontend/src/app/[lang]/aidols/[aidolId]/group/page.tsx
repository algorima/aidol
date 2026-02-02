import { redirect } from "next/navigation";

interface GroupPlanningPageProps {
  params: { lang: string; aidolId: string };
}

export default function GroupPage({ params }: GroupPlanningPageProps) {
  redirect(`/${params.lang}/aidols/${params.aidolId}/group/name`);
}
