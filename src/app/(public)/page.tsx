import React from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import MainPage from "@/components/ui/main/MainPage";
import Services from "@/components/ui/services/Services";
import Choises from "@/components/ui/choices/Choises";
import Instruction from "@/components/ui/instruction/Instruction";
import { Pricing } from "@/components/ui/pricing/Pricing";
import { Footer } from "@/components/ui/footer/Footer";

export default function Home() {
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
