import Header from "@/component/common/header/header";
import { getMeAction } from "@/app/action/getMe.action";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getMeAction();

  const user = result.isError ? null : result.user;

  return (
    <>
      <Header user={user} />
      <main>{children}</main>
    </>
  );
}
