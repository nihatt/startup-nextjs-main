"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { auth } from "../../../firebase";
import { useRouter } from 'next/navigation'


import { useEffect } from "react";
import Main from "@/components/Main";

//how to make this page private

const MainPage = (props) => {
  const router = useRouter();




  return (
    <>
      <Breadcrumb
        pageName="Galya Finansal İşlemler"
        description="İşleminize devam etmek için giriş yapınız ya da hesabınız yoksa kayıt olunuz."
      />

      <Main />
      </>

      );
};

      export default MainPage;
