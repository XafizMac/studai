// src/app/page.tsx
'use client'

import React, { useEffect, useContext, useState } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import MainPage from "@/components/ui/main/MainPage";
import Services from "@/components/ui/services/Services";
import Choises from "@/components/ui/choices/Choises";
import Instruction from "@/components/ui/instruction/Instruction";
import { Pricing } from "@/components/ui/pricing/Pricing";
import { Footer } from "@/components/ui/footer/Footer";
import Dashboard from "@/components/ui/dashboard/page";
import { Spin } from "antd";
import { Context } from "../clientProvider";

export default function Home() {
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.checkAuth().finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [store]);

  if (loading) {
    return (
      <div>
        loading...
        <Spin fullscreen={true} size="large"/>
      </div>
    );
  }

  

  return (
    <main>
      {store.isAuth ? (
        <Dashboard />
      ) : (
        <>
          <Navbar />
          <MainPage />
          <Services />
          <Choises />
          <Instruction />
          <Pricing />
          <Footer />
        </>
      )}
    </main>
  );
}
