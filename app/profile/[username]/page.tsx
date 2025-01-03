import CompleteProfilePage from "@/components/AdvanceProfile/CompletePage"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username
  
return <CompleteProfilePage params={{ username }} />
}