"use client";
import { useState, useEffect } from "react";
import Heart from "./Heart";
import LoadingDots from "./loading-dots";
import { useRouter } from "next/navigation";
import localFont from 'next/font/local'

const rubraCosta = localFont({
  src: './fonts/DFVN Rubra Costa.otf'
})

const indulgeScript = localFont({
  src: './fonts/DFVN Indulge Script.otf'
});

const CountDays = () => {
  const [days, setDays] = useState(0);
  const [touch, setTouch] = useState(0);
  const router = useRouter();

  const loveDate = "July, 27, 2023";

  const getTime = (loveDate: string) => {
    const time = Date.now() - Date.parse(loveDate);
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };

  const handleClick = () => {
    const count = touch + 1;
    if (count === 3) {
      router.push("/diary");
    } else {
      setTouch(touch + 1);
    }
  };

  useEffect(() => {
    getTime(loveDate);
  }, []);

  return (
    <>
      <div className="absolute">
        {days ? (
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleClick}
          >
            <Heart />
            <div className="z-10 absolute mb-10 flex flex-col items-center">
              <h2
                className={`text-[#A084E8] font-medium flex items-center text-xl z-10 uppercase`}
              >
                Nguyệt
                <p className="text-[#8BE8E5] mx-2">x</p> Kha
              </h2>

              <div className={`text-6xl font-bold text-[#A084E8] ${rubraCosta.className}`}>
                <span className="text-[#8BE8E5]">{days}</span> Ngày
              </div>
            </div>
          </div>
        ) : (
          <LoadingDots />
        )}
      </div>
    </>
  );
};

export default CountDays;
