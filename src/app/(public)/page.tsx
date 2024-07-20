"use client";

import React, { useEffect, useContext, useState } from "react";
import Navbar from "@/components/ui/navbar/page";
import MainPage from "@/components/ui/main/MainPage";
import Services from "@/components/ui/services/Services";
import Choises from "@/components/ui/choices/Choises";
import Instruction from "@/components/ui/instruction/Instruction";
import { Pricing } from "@/components/ui/pricing/Pricing";
import { Footer } from "@/components/ui/footer/Footer";
import { Button, Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { Context } from "../clientProvider";

export default function Home() {
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const state = searchParams.get("state");
  const code = searchParams.get("code");

  const OAuthCallback = async () => {
    try {
      if (state && code) {
        console.log("OAuth state:", state);
        console.log("OAuth code:", code);

        const response = await store.oAuthCallbacks(state, code);
        console.log("OAuth response:", response);
      } else {
        console.error("State or code is missing.");
      }
    } catch (err) {
      console.error("Error during OAuth authorization", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await store.checkAuth();
      }
      setLoading(false);
    };

    checkAuth();
  }, [store]);

  if (loading) {
    return (
      <div>
        <Spin fullscreen size="large" />
      </div>
    );
  }

  return (
    <div className="mainPage">
      {/* <Button onClick={OAuthCallback}>Enter</Button> */}
      <Navbar />
      <MainPage />
      <Services />
      <Choises />
      <Instruction />
      <Pricing />
      <Footer />
    </div>
  );
}
