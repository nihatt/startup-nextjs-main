import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { auth } from "../../firebase";
import { Metadata } from "next";
import WithDrawPage from "./withdraw/page";
import SignupPage from "./signup/page";
import MainPage from "./main/page";

export const metadata: Metadata = {
  title: "Galya Markets",
  description: "",
  // other metadata
};

export default function Home() {
  const user = auth.currentUser
  return (

  user ? <WithDrawPage /> : <MainPage />
   
  );
}
