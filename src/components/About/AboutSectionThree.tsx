import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
          
          <Image
          
                unoptimized src="/1.png"
                alt="about image"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Building Green, Rebuilding Earth
                A promise delivered!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                King's Developers Limited recognizes the positive effect of a shared and wholly protected environment. Our company has been founded under a policy of environmental protection.
                </p>
              </div>
              <div className="mb-1">
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                To create value and make a difference in every business we engage, we believe:
                Our assets are our people, capital and reputation, If any of these is ever diminished, the last is the most difficult to restore. We are dedicated to complying fully with the letter and spirit of the laws, rules and ethical principles that govern us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
