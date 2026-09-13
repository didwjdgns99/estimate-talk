import Header from "@/component/common/header/header";
import { getMeAction } from "@/app/action/getMe.action";
import UserProvider from "@/context/userContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getMeAction();

  const user = result.isError ? null : result.user;

  return (
    <UserProvider user={user}>
      <Header />
      <main>{children}</main>
    </UserProvider>
  );
}
