// components/Hero.tsx
import { FC } from "react";

import Divider from "@/components/Divider";
import Divider2 from "@/components/Divider-2";
const SaveTheDateSection: FC = () => {
  return (
    <section className="relative h-screen">
      <div className="relative h-screen w-full">
        {/* Background image layer */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(/images/DSC04481.JPG)` }}
        />

        {/* Overlay (optional dark layer for text readability) */}
        <div className="absolute inset-0 bg-[#C08081]/50" />

        {/* Centered content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center px-4 py-24 text-white">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            We&apos;re getting married
          </h3>

          <Divider2 position="top" width={200} height={80} />

          <div className="max-w-4xl w-full border-2 border-white  grid grid-cols-1 md:grid-cols-2 rounded-xl mt-20">
            {/* Left: Save the Date */}
            <div className="flex flex-col items-center justify-center text-center pb-6 md:pb-0 e">
              <h3 className="text-6xl sm:text-7xl md:text-8xl font-bold">
                Save
              </h3>
              <span className="text-2xl sm:text-2xl mt-2 mb-1 tracking-widest">
                THE
              </span>
              <h3 className="text-6xl sm:text-7xl md:text-8xl font-bold">
                Date
              </h3>
            </div>

            {/* Right: Details */}
            <div className="text-center flex flex-col md:text-left space-y-4 items-center justify-center bg-[#C08081]/80 px-6 py-10  ">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center">
                Junna <span className="text-2xl">&</span> Ronnel
              </h2>
              <p className="text-sm sm:text-base uppercase tracking-wider text-center text-white">
                Request the honor of your presence on their wedding day
              </p>

              <Divider position="top" width={160} height={80} />

              <div className=" py-3 text-center text-white">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  August 8, 2025
                </p>
                <p className="text-base md:text-lg">at 04:00 PM</p>
              </div>

              <Divider position="bottom" width={160} height={80} />

              <div className="text-base md:text-lg leading-snug text-center text-white">
                <p>at Sky Garden Cafe</p>
                <p>Lazuri Tagaytay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDateSection;
