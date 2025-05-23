// components/ProposalSection.tsx
import Image from "next/image";
import { Button } from "flowbite-react";

const ProposalSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white bg-opacity-40">
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 gap-10 relative z-20">
        {/* Text Section */}
        <div className="flex-1 text-center">
          <h2 className="text-black text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
            He asked her & she said yes!
          </h2>
          <p className="text-black text-sm sm:text-lg mb-6 max-w-1xl mx-auto">
            We were in a long-distance relationship for four years before finally meeting in person for the first time. I took that moment as the perfect opportunity to propose to her—on March 14, 2023. The day became even more special with the presence of our family and friends, whose unwavering support and guidance have been a significant part of our journey.
          </p>
          <div className="flex justify-center">
            <Button color="red" outline>
              OUR LOVE STORY
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative">
          <div className="w-[280px] sm:w-[320px] md:w-[360px] mx-auto md:mx-0 transform md:translate-x-8 lg:translate-x-16">
            <Image
              src="/images/RonnelJuna-98.JPG"
              alt="Proposal"
              width={360}
              height={540}
              className="rounded-lg shadow-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;
