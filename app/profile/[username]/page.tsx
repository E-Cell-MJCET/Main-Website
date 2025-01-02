export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username
  
return <div>Profile of: {username}</div>
}