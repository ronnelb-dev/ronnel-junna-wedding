import { FC } from "react";
import Divider from "@/components/Divider";
import Divider2 from "@/components/Divider-2";

const SaveTheDateSection: FC = () => {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="relative w-full min-h-[100dvh]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(/images/DSC04481.JPG)` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#C08081]/50" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center items-center px-4 text-white py-10 h-full">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold sm:mb-12 mb-6 text-center">
            We&apos;re getting married
          </h3>

          <Divider2 position="top" width={200} height={80} />

          <div className="max-w-5xl w-full border-2 border-white grid grid-cols-1 md:grid-cols-2 rounded-xl mt-10 md:mt-20 overflow-hidden">
            {/* Left Side: Save the Date */}
            <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-black/20">
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold">Save</h3>
              <span className="text-lg sm:text-1xl mt-2 mb-1 tracking-widest">THE</span>
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold">Date</h3>
            </div>

            {/* Right Side: Details */}
            <div className="flex flex-col items-center justify-center bg-[#C08081]/80 px-6 py-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
                Junna <span className="text-xl">&</span> Ronnel
              </h2>

              <p className="text-sm sm:text-base uppercase tracking-wider text-center">
                Request the honor of your presence on their wedding day
              </p>

              <Divider position="top" className="w-[100%] max-w-sm mx-auto" />

              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold">August 8, 2025</p>
                <p className="text-sm sm:text-base">at 04:00 PM</p>
              </div>

              <Divider position="bottom" className="w-[100%] max-w-sm mx-auto" />

              <div className="text-sm sm:text-base text-center">
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
