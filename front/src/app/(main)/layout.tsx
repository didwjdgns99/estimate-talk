import Header from "@/component/common/header/header";
import UserProvider from "@/context/userContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Header />
      <main>{children}</main>
    </UserProvider>
  );
}
