import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

export function initializeSwiper() {
  var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    autoplay: {
      delay: 2000, // 2 seconds
      disableOnInteraction: false,
    },
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
