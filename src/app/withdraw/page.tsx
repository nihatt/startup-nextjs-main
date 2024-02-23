"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { auth } from "../../../firebase";
import { useRouter } from 'next/navigation'


import { useEffect } from "react";

//how to make this page private

const WithDrawPage = (props) => {
  const router = useRouter();


useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('user is signed in')
      
    } else {
      // Kullanıcı oturum açmamışsa, giriş yapma sayfasına yönlendir
      router.push('/signin');
    }
  });

  return () => unsubscribe();
}, []);
useEffect(() => {
  const handleBeforeUnload = (event) => {

  auth.signOut()
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, []);

  return (
    <>
      <Breadcrumb
        pageName="Para Çekimi"
        description="Sistemlerimizden en güvenli şekilde para çekmek için aşağıdaki formu doldurunuz."
      />

      <Contact />
    </>
  );
};

export default WithDrawPage;
