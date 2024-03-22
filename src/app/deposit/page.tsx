"use client"
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import Image from "next/image";

import { Metadata } from "next";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { useRouter } from 'next/navigation'
import SingleBlog from "@/components/Blog/SingleBlog";
import { Blog } from "@/types/blog";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const Deposit = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [traderId, setTraderId] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [iban, setIban] = useState("");
  const botToken = '6901253574:AAHbWBJJYHyJWudIM_B460DWK9YHXa3EzJg';
  const channelName = '-1002137376808';
  const dbRef = collection(db, "yatirimlar");
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
  const blog: Blog = {
    id: 1,
    title: "IBAN ADRESİMİZİN QR KODU",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
    image: "/images/logo/indir.png",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/author-01.png",
      designation: "Graphic Designer",
    },
    tags: ["Business", "Marketing"],
    publishDate: "2025",
  }

  async function handleWithdraw(event) {
    event.preventDefault();
    const url = 'https://graph.facebook.com/v18.0/283965978124377/messages';
    const accessToken = 'EAAeBfZAKAllkBOwuFW9EuX0WfR6689o1pkgSaANCQvo1WJMIrDEEehHnug6Acc7aRd8ROU2VWHAFLACFo7Q7HcXHPQxsAZBKHRC11ZClgZBycakJQGkCihT7bLZCSAbSMDieD2ZAwZCZCXmR3Ab0uSVz2iWyZAYxZAJCIVx3T6PFa9gGTNZBAyiV396qhNUFVS1s18GsuZB3qfHYwp456ETp5ch71ZC5rE3u4';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '447424298460',
        type: 'template',
        template: {
          name: 'yeni_yatirim',
          "components": [
            {
              "type": "body",
              "parameters": [

                {
                  "type": "text",
                  "text":traderId
                },
                          {
                  "type": "text",
                  "text":amount
                }                    
      
              ]
            }
          ],
          language: {
            code: 'tr'
          }
        }
      })
    };
    const whatsapp = await fetch(url, requestOptions)
    await addDoc(dbRef, {name: name, traderId: traderId, amount: amount})
    .then(docRef => {
      console.log("Document has been added successfully");
    })
    .catch(error => {
      alert(error);
    })
    const sendResponse2 = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelName}&text=🎉🎉💶💵🎉🎉%0A ➡️➡️${traderId}%0A  ‼️‼️ ${amount} USD yatırdı ‼️‼️%0A Kontrol Eder Misiniz?`);

     if (sendResponse2.ok) {
     alert("Para yatırma talebiniz alınmıştır. En kısa sürede finans ekibimiz sizinle iletişime geçecektir.")
    }

  }
  const copyText = (state) => {
    if (state == 1) {
      const textToCopy = document.getElementById("name").textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert("AÇIKLAMA KISMINA ÖDEME YAZINIZ");
        })
        .catch((error) => {
          console.error('Metin kopyalanırken bir hata oluştu:', error);
        });
    }
    else if (state == 2) {
      const textToCopy = document.getElementById("iban1").textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert("AÇIKLAMA KISMINA ÖDEME YAZINIZ");
        })
        .catch((error) => {
          console.error('Metin kopyalanırken bir hata oluştu:', error);
        });
    }
    else if (state == 22) {
      const textToCopy = document.getElementById("iban2").textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert("AÇIKLAMA KISMINA ÖDEME YAZINIZ");
        })
        .catch((error) => {
          console.error('Metin kopyalanırken bir hata oluştu:', error);
        });
    }
    else if (state == 3) {
      const textToCopy = document.getElementById("iban3").textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert("AÇIKLAMA KISMINA ÖDEME YAZINIZ");
        })
        .catch((error) => {
          console.error('Metin kopyalanırken bir hata oluştu:', error);
        });
    }
    else if (state == 4) {
      const textToCopy = document.getElementById("iban4").textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert("AÇIKLAMA KISMINA ÖDEME YAZINIZ");
        })
        .catch((error) => {
          console.error('Metin kopyalanırken bir hata oluştu:', error);
        });
    }

  }


  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-12/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Para Yatırma
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">


                </div>
                <div>
                  <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
                    <p className="text-center text-base font-medium italic text-body-color">
                      YATIRIM YAPTIKTAN SONRA FORMU DOLDURMAYI UNUTMAYINIZ . DİLERSENİZ HESAP BİLGİLERİMİZİ KOPYALAYARAK VEYA QR KODU OKUTARAK YATIRIM YAPABİLİRSİNİZ.  <br></br> <br></br> <br></br>
                      <strong>KOPYALAMAK İSTEDİĞİNİZ BİLGİNİN ÜSTÜNE TIKLAMANIZ YETERLİDİR</strong> <br></br>
                      <strong className="">AÇIKLAMA KISMINA ÖDEME YAZINIZ</strong><br></br> <br></br>
                      <strong className="">AÇIKLAMA KISMINA ÖDEME YAZINIZ</strong>

                    </p>

                    <span className="absolute left-0 top-0 z-[-1]">

                      <svg
                        width="132"
                        height="109"
                        viewBox="0 0 132 109"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M33.0354 90.11C19.9851 102.723 -3.75916 101.834 -14 99.8125V-15H132C131.456 -12.4396 127.759 -2.95278 117.318 14.5117C104.268 36.3422 78.7114 31.8952 63.2141 41.1934C47.7169 50.4916 49.3482 74.3435 33.0354 90.11Z"
                          fill="url(#paint0_linear_111:606)"
                        />
                        <path
                          opacity="0.5"
                          d="M33.3654 85.0768C24.1476 98.7862 1.19876 106.079 -9.12343 108.011L-38.876 22.9988L100.816 -25.8905C100.959 -23.8126 99.8798 -15.5499 94.4164 0.87754C87.5871 21.4119 61.9822 26.677 49.5641 38.7512C37.146 50.8253 44.8877 67.9401 33.3654 85.0768Z"
                          fill="url(#paint1_linear_111:606)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_111:606"
                            x1="94.7523"
                            y1="82.0246"
                            x2="8.40951"
                            y2="52.0609"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.06" />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_111:606"
                            x1="90.3206"
                            y1="58.4236"
                            x2="1.16149"
                            y2="50.8365"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.06" />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <span className="absolute bottom-0 right-0 z-[-1]">
                      <svg
                        width="53"
                        height="30"
                        viewBox="0 0 53 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          opacity="0.8"
                          cx="37.5"
                          cy="37.5"
                          r="37.5"
                          fill="#4A6CF7"
                        />
                        <mask
                          id="mask0_111:596"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="75"
                          height="75"
                        >
                          <circle
                            opacity="0.8"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            fill="#4A6CF7"
                          />
                        </mask>
                        <g mask="url(#mask0_111:596)">
                          <circle
                            opacity="0.8"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            fill="url(#paint0_radial_111:596)"
                          />
                          <g opacity="0.8" filter="url(#filter0_f_111:596)">
                            <circle
                              cx="40.8089"
                              cy="19.853"
                              r="15.4412"
                              fill="white"
                            />
                          </g>
                        </g>
                        <defs>
                          <filter
                            id="filter0_f_111:596"
                            x="4.36768"
                            y="-16.5881"
                            width="72.8823"
                            height="72.8823"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feGaussianBlur
                              stdDeviation="10.5"
                              result="effect1_foregroundBlur_111:596"
                            />
                          </filter>
                          <radialGradient
                            id="paint0_radial_111:596"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(37.5 37.5) rotate(90) scale(40.2574)"
                          >
                            <stop stopOpacity="0.47" />
                            <stop offset="1" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </span>
                  </div>
                  <div className="mb-5 relative">
                    <a
                      href="#0"
                      id="name1"
                      onClick={() => null}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      TEB BANKASI
                    </a>
                    <a
                      href="#0"
                      id="name"
                      onClick={() => copyText(1)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      GALYA EĞİTİM BİLİŞİM VE DANIŞMANLIK LİMİTED ŞİRKET
                    </a>
                    <a
                      href="#0"
                      id="iban1"
                      onClick={() => copyText(2)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      TR 4500 0320 0000 0001 2129 6059
                    </a>
                  </div>
                  <div className="mb-5 relative">
                    <a
                      href="#0"
                      id="name"
                      onClick={() => null}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      YAPI KREDİ BANKASI
                    </a>
                    <a
                      href="#0"
                      id="name"
                      onClick={() => copyText(1)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      GALYA EĞİTİM BİLİŞİM VE DANIŞMANLIK LİMİTED ŞİRKETİ
                    </a>
                    <a
                      href="#0"
                      id="iban2"
                      onClick={() => copyText(22)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      TR 8100 0670 1000 0000 3920 4294
                    </a>
                  </div>
                  <div className="mb-5 relative">
                    <a
                      href="#0"
                      id="name"
                      onClick={() => null}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      QNB FİNANSBANK
                    </a>
                    <a
                      href="#0"
                      id="name"
                      onClick={() => copyText(1)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      GALYA EĞİTİM BİLİŞİM VE DANIŞMANLIK LİMİTED ŞİRKETİ
                    </a>
                    <a
                      href="#0"
                      id="iban3"
                      onClick={() => copyText(3)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      TR72 0011 1000 0000 0133 6553 18
                    </a>
                  </div>
                  <div className="mb-5 relative">
                    <a
                      href="#0"
                      id="name"
                      onClick={() => null}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      GARANTİ BANKASI
                    </a>
                    <a
                      href="#0"
                      id="name"
                      onClick={() => copyText(1)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 mx-20 py-2 text-sm font-semibold text-white"
                    >
                      GALYA EĞİTİM BİLİŞİM VE DANIŞMANLIK LİMİTED ŞİRKET
                    </a>
                    <a
                      href="#0"
                      id="iban4"
                      onClick={() => copyText(4)}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      TR65 0006 2000 7460 0006 2943 22
                    </a>
                  </div>

                  <div className="w-full  lg:w-12/12 xl:w-12/12">
                    <div
                      className="mb-12 rounded-sm bg-white px-8  shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                      data-wow-delay=".15s
              "
                    >
                      <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                        Para Yatırma Formu
                      </h2>
                      <p className="mb-12 text-base font-medium text-body-color">
                        Formu Doldurktan 15 dakika sonra finans ekibimiz sizinle iletişime geçecek.
                      </p>
                      <form>
                        <div className="-mx-4 flex flex-wrap">
                          <div className="w-full px-4 md:w-1/2">
                            <div className="mb-8">
                              <label
                                htmlFor="name"
                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                              >
                                İsim Soyisim
                              </label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="İsminiz"
                                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                              />
                            </div>
                          </div>
                          <div className="w-full px-4 md:w-1/2">
                            <div className="mb-8">
                              <label
                                htmlFor="email"
                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                              >
                                Meta Trader ID
                              </label>
                              <input
                                type="text"
                                value={traderId}
                                onChange={(e) => setTraderId(e.target.value)}
                                placeholder="Meta Trader ID"
                                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                              />
                            </div>
                          </div>

                          <div className="w-full px-4 md:w-1/2">
                            <div className="mb-8">
                              <label
                                htmlFor="message"
                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                              >
                                Tutar
                              </label>
                              <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="100$ 200TL ...."
                                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                              />
                            </div>
                          </div>

                          <div className="w-full px-4">
                            <button onClick={handleWithdraw} className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                              Yatırım Talebini İlet
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Yatırımınızı yaptıktan hemen sonra formumuzu doldurunuz . Finans ekibimiz en kısa sürede sizinle iletişime geçecektir. 20 dakika içinde dönüş alamazsanız lütfen canlı destek hattımızdan bize ulaşınız.
                    <span className="text-primary underline dark:text-white">
                      {" "}
                      Ortalama işlem süremiz 15 dakikanın altındadır
                    </span>

                  </p>






                </div>
              </div>
            </div>
            <div className="w-full px-4 my-40 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <SingleBlog blog={blog} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Deposit;
