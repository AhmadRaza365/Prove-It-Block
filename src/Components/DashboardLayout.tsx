import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

type Props = {
  children: React.ReactNode;
  pageName: string;
};

function DashboardLayout({ children, pageName }: Props) {
  return (
    <>
      <Header isDashboard />
      <main className="min-h-[80vh] flex items-start gap-x-5 pr-20">
        <section className="w-72 min-w-[18rem]">
          <SideBar activePage={pageName} />
        </section>
        <section className="grow pt-10">{children}</section>
      </main>
    </>
  );
}

export default DashboardLayout;
