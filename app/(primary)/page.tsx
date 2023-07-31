import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header/Header";
import Features from "@/components/Features/Features";

import BlogSection from "./blogSection";
import { getResourcesForHome, getBlogsForHome } from "../utils/resourceDataFetch";
export const metadata: Metadata = {
  title: "Quick1 Dev Interview Preparation",
  description: "Generated1 by create next app"
};

const Home = async () => {
  const resourcePosts = await getResourcesForHome();
  const blogPosts = await getBlogsForHome();
  return (
    <div>
      <Header />
      <Features />
      <BlogSection resourcePosts={resourcePosts} blogPosts={blogPosts}  />
    </div>
  );
};

export default Home;
