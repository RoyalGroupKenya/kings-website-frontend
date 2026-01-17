import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-10">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          More About Us
        </h2>
        <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-sm xl:leading-relaxed">
      
        <strong className="text-primary dark:text-white">
        Kings Developers Ltd (KDL)
          </strong>
         is one of the leading real estate companies in Kenya with a range of affordable to middle class and high-end properties. It is part of the royal group of companies, a professionally managed group, diversified in a wide range of business activities. They range from construction, imports, glass and hardware, retail distribution and fleet business.
         
        </p>
        <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-sm xl:leading-relaxed">
        KDL was established to offer innovative solutions for local and foreign investors in the Real Estate Development Sector in Kenya. Recognized as one of Kenya's most active real estate developers, KDL is a nationally acclaimed developer of commercial, residential, retail, hospitality and mixed-use properties.

The firm which is wholly Kenyan owned bring together a team of innovative professionals with a wealth of experience in business management, architectural, engineering, marketing, construction and real estate development sectors in both Private and Public Sectors.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-sm xl:leading-relaxed">
                  In 2004 KDL came into existence to facilitate a better means of administration and management of the company. KDL is a nationally acclaimed Kenyan developer of commercial, residential, retail, hospitality and mixed-use properties. The firm was established to offer innovative solutions for local and foreign investors in the real estate development sector in Kenya and is recognized as one of Kenya's most active real estate developers. It is presently involved in developing properties in Nairobi, Mombasa, Eldoret and Nakuru but has plans to expand its operations to cover other towns in the country.
                  </p>
                  <h3 className="mb-8 text-2xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
       What We Offer
        </h3>
        <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-sm xl:leading-relaxed">
        As a leading Kenyan real estate developer, we offer a comprehensive portfolio, from homes for sale and rent to investment opportunities, catering to commercial needs, affordable living, and sustainable practices through green building.

                  </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
