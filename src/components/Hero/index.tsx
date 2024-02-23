"use client";
import { auth } from "../../../firebase";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const user = auth.currentUser;
  useEffect(() => {
    const handleBeforeUnload = (event) => {
  
    auth.signOut()
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
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
  return (
    null
  );
};

export default Hero;
