import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header/Header";
import Features from "@/components/Features/Features";

import BlogSection from "./blogSection";
import { getResourcesForHome } from "../utils/resourceDataFetch";
export const metadata: Metadata = {
  title: "Quick1 Dev Interview Preparation",
  description: "Generated1 by create next app"
};

const Home = async () => {
  const posts = await getResourcesForHome();
  return (
    <div>
      <Header />
      <Features />
      <BlogSection posts={posts} />
    </div>
  );
};

export default Home;
