"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { auth } from "../../../firebase";

const Main = () => {
  const route = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        route.push('/deposit');
        
      } else {
        // Kullanıcı oturum açmamışsa, giriş yapma sayfasına yönlendir
        
      }
    });

    return () => unsubscribe();
  }, []);

  


  return (
    <section id="contact" className="overflow-hidden  ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
      
            <div className="shadow-three  max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">

              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 mb-6">
                  <button
                    onClick={() => route.push('/signin')}
                    className="w-full inline-block bg-primary hover:bg-primary-dark text-white font-semibold rounded py-3 transition duration-300"
                  >
                    Giriş Yap
                  </button>
                </div>
                <div className="w-full px-4">
                  <button
                    onClick={() => route.push('/signup')}
                    className="w-full inline-block bg-primary hover:bg-primary-dark text-white font-semibold rounded py-3 transition duration-300"
                  >
                    Kayıt Ol
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Main;
