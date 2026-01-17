"use client"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

type Props = {
  images: string[]
  title?: string
  autoplay?: boolean
  showFullscreenButton?: boolean
}

const LuxuryPropertySlider = ({ images, title, autoplay = true, showFullscreenButton = true }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    document.body.style.overflow = !isFullscreen ? "hidden" : "auto"
  }

  return (
    <div className={`luxury-slider-container relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
      {title && <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>}

      {/* Custom navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button className="prev-button bg-white/80 backdrop-blur-sm hover:bg-white text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button className="next-button bg-white/80 backdrop-blur-sm hover:bg-white text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Fullscreen button */}
      {showFullscreenButton && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      )}

      {/* Current image indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
        {activeIndex + 1} / {images.length}
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          prevEl: ".prev-button",
          nextEl: ".next-button",
        }}
        autoplay={
          autoplay
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        loop={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={`mySwiper ${isFullscreen ? "h-screen" : ""}`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div
              className={`
              relative 
              ${isFullscreen ? "h-screen w-screen" : "aspect-[16/9] w-[90%] md:w-[85%] lg:w-[80%]"}
              rounded-xl overflow-hidden
              transition-all duration-500
              group
            `}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={image || "/placeholder.svg"}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: #fff;
          width: 30px;
          border-radius: 6px;
        }
        
        .swiper-slide {
          transition: all 0.5s ease;
          filter: brightness(0.7);
        }
        
        .swiper-slide-active {
          filter: brightness(1);
        }
        
        .swiper-slide-active .group-hover:opacity-100 {
          opacity: 1;
        }
        
        .swiper-container {
          padding-bottom: 50px;
        }
        
        .luxury-slider-container {
          padding: 20px 0 60px;
        }
      `}</style>
    </div>
  )
}

export default LuxuryPropertySlider
