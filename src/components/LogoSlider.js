import { Swiper, SwiperSlide } from "swiper/react";
import { brandListProps } from "../sliderProps";

const bankLogos = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/159211/pexels-photo-159211.jpeg",
    alt: "Visa",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/207217/pexels-photo-207217.jpeg",
    alt: "Mastercard",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    alt: "JPMorgan Chase",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/159212/pexels-photo-159212.jpeg",
    alt: "HSBC",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/546820/pexels-photo-546820.jpeg",
    alt: "Bank of America",
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/207218/pexels-photo-207218.jpeg",
    alt: "Citi",
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/159213/pexels-photo-159213.jpeg",
    alt: "Wells Fargo",
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/546821/pexels-photo-546821.jpeg",
    alt: "Barclays",
  },
];

const LogoSlider = () => {
  return (
    <Swiper {...brandListProps} className="brand-list owl-carousel">
      {bankLogos.map((logo) => (
        <SwiperSlide key={logo.id}>
          <div className="brand-single-box">
            <div className="brand-thumb">
              <img src={logo.image} alt={logo.alt} style={{width: '200px'}}/>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;