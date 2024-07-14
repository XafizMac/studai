"use client";

import React, { useEffect, useContext, useState } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import MainPage from "@/components/ui/main/MainPage";
import Services from "@/components/ui/services/Services";
import Choises from "@/components/ui/choices/Choises";
import Instruction from "@/components/ui/instruction/Instruction";
import { Pricing } from "@/components/ui/pricing/Pricing";
import { Footer } from "@/components/ui/footer/Footer";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { Context } from "./clientProvider";

export default function Home() {
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const state = searchParams.get("state");
  const code = searchParams.get("code");

  useEffect(() => {
    const OAuthCallback = async () => {
      try {
        if (state && code) {
          const response = await store.oAuthCallbacks(state, code);
          console.log(response);
        }
      } catch (err) {
        console.log("Error", err);
      }
    };

    if (state && code) {
      console.log("State: ", state);
      console.log("Code: ", code);
      OAuthCallback();
    }
  }, [state, code, store]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        await store.checkAuth();
      }
      setLoading(false);
    };

    checkAuth();
  }, [store]);

  if (loading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mainPage">
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
