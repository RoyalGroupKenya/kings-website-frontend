
import { IconBathFilled, IconBed, IconBedFilled, IconLocation, IconMapPin, IconRulerMeasure } from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ data }) => {

  return (
    <>
      <div className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <div
          className="relative block aspect-[37/22] w-full"
        >
          <Link href={`/type/${data?.type}`} className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {data?.status}
          </Link>
           <Image  unoptimized className="object-cover" src={`https://kingsdevelopersapi.co.ke${data?.images[0]}`} alt={data?.name} fill />
        </div>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={`/project/${data?.name.replace(/,?\s+/g, '-').toLowerCase()}_${data?.id}`}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {data?.name}
            </Link>
          </h3>
          <Link href={`/location/${data?.location.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-").toLowerCase().replace(/^-+|-+$/g, "")}`}>
          <p className="mb-6  border-body-color border-opacity-10 pb-6 text-base flex flex-row gap-2 font-medium text-body-color dark:border-white dark:border-opacity-10">
           <IconMapPin className="text-primary" /> {data?.location}
          </p>
          </Link>
         
          <p className="mb-6  border-body-color border-opacity-10 pb-6 text-base flex flex-row gap-2 font-medium text-body-color dark:border-white dark:border-opacity-10">
           <IconBedFilled className="text-primary" /> {data?.bedrooms}   <IconRulerMeasure className="text-primary" />  {data?.size}  <IconBathFilled className="text-primary" />  {data?.bathrooms}
          </p>
          
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
             
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By Kings Developers
                </h4>
                <p className="text-xs text-body-color">{data?.type}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{moment(data?.created_at).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
