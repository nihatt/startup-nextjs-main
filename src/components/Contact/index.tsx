"use client"
import { useEffect, useState } from "react";
import NewsLatterBox from "./NewsLatterBox";
import { useRouter } from 'next/navigation'
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const Contact = () => {
  const dbRef = collection(db, "cekimler");
  const route = useRouter();
  const [name, setName] = useState("");
  const [traderId, setTraderId] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [iban, setIban] = useState("");
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {

  //     auth.signOut()
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  // }, []);

  const botToken = "7037340665:AAG7QCE3D_ni6UCOSDZj3Vsasq771kBigTY";
  const channelName = "-1002025159073"
  async function handleWithdraw(event) {

    event.preventDefault();
    console.log(name, traderId, bankName, iban);
    await addDoc(dbRef, {
      bankaAdi: bankName,
      hesapNo: iban,
      isim: name,
      traderId: traderId,
      tutar: amount
    })
      .then(docRef => {
        console.log("Document has been added successfully");
      })
      .catch(error => {
        alert(error);
      })
    const sendResponse2 = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelName}&text=⚡️⚡️‼️‼️⚡️⚡️%0A ➡️➡️${traderId}%0A  ‼️‼️ ${amount} USD çekmek istiyor ‼️‼️%0A %0A Hesap numarası : ${iban} %0A %0AKontrol Eder Misiniz?`);
    if (sendResponse2.ok) {
      alert("Çekim talebiniz alınmıştır. En kısa sürede finans ekibimiz sizinle iletişime geçecektir.")
    }

  }

  return (
    <section id="contact" className="overflow-hidden  ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-white px-8  shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Para Çekme Formu
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
                        Banka Adı
                      </label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Yapıkredi , Garanti , İş Bankası..."
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
                        placeholder="100$ 200TL ..."
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
                        IBAN veya TC20 Numarası
                      </label>
                      <input
                        type="text"
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        placeholder="IBAN veya TC20 Numarası"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button onClick={handleWithdraw} className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Çekim Talebini İlet
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
