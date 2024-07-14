"use client";

import React, { useEffect, useContext, useState } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import MainPage from "@/components/ui/main/MainPage";
import Services from "@/components/ui/services/Services";
import Choises from "@/components/ui/choices/Choises";
import Instruction from "@/components/ui/instruction/Instruction";
import { Pricing } from "@/components/ui/pricing/Pricing";
import { Footer } from "@/components/ui/footer/Footer";
// import { Spin } from "antd";
// import { useSearchParams } from "next/navigation";
// import { Context } from "./clientProvider";

export default function Home() {
  // const { store } = useContext(Context);
  // const [loading, setLoading] = useState(true);
  // const searchParams = useSearchParams();

  // const state = searchParams.get("state");
  // const code = searchParams.get("code");

  // if (state && code) {
  //   console.log("State: ", state);
  //   console.log("Code: ", code);

  //   const OAuthCallback = async () => {
  //     try {
  //       const response = await store.oAuthCallbacks(state, code);
  //       console.log(response);
  //     } catch (err) {
  //       console.log("Error", err);
  //     }
  //   };
  //   OAuthCallback();
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     store.checkAuth().finally(() => {
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [store]);

  // if (loading) {
  //   return (
  //     <div>
  //       <Spin fullscreen={true} size="large" />
  //     </div>
  //   );
  // }

  return (
    <div className="mainPage">
      <p>Hello</p>
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
