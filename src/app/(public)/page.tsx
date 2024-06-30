'use client'

import React, { useContext, useEffect } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import MainPage from "@/components/ui/main/MainPage";
import Services from "@/components/ui/services/Services";
import Choises from "@/components/ui/choices/Choises";
import Instruction from "@/components/ui/instruction/Instruction";
import { Pricing } from "@/components/ui/pricing/Pricing";
import { Footer } from "@/components/ui/footer/Footer";
import { Context } from "../layout";
import { useRouter } from "next/navigation";

export default function Home() {
  const { store } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  useEffect(() => {
    if (store.isAuth) {
      router.replace('/dashboard');
    }
  }, [store.isAuth, router]);

  return (
    <main>
      <Navbar />
      <MainPage />
      <Services />
      <Choises />
      <Instruction />
      <Pricing />
      <Footer />
    </main>
  );
}
