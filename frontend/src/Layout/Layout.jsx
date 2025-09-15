import{ AppSidebar } from '@/components/AppSidebar';
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main className="w-full">
          <div className="w-full min-h-[calc(100vh-50px)] py-22 p-2 ">
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
