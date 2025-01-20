import { getUser } from "@/actions/user_actions";
import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFlow",
  description: "Track, Find, and Land Your Dream Job—All in One Place!",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const data = await getUser() || null

  return (
    <>
        {/* <Navbar user={data?.user}/> */}
        <div className="flex flex-wrap items-center justify-center">
          {children}
        </div>
    </>
  );
}
