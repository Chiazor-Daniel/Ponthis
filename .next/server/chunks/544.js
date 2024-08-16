"use strict";
exports.id = 544;
exports.ids = [544];
exports.modules = {

/***/ 8544:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gy": () => (/* binding */ brandListProps2),
/* harmony export */   "rm": () => (/* binding */ heroSlider),
/* harmony export */   "v3": () => (/* binding */ testimonial_list_slider)
/* harmony export */ });
/* unused harmony exports caseStudyProps, brandListProps */
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3877);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper__WEBPACK_IMPORTED_MODULE_0__]);
swiper__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

swiper__WEBPACK_IMPORTED_MODULE_0__["default"].use([
    swiper__WEBPACK_IMPORTED_MODULE_0__.Mousewheel,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Pagination,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Navigation,
    swiper__WEBPACK_IMPORTED_MODULE_0__.EffectFade,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Autoplay,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Grid,
    swiper__WEBPACK_IMPORTED_MODULE_0__.EffectCreative,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Virtual
]);
const caseStudyProps = {
    loop: true,
    spaceBetween: 30,
    autoplay: true,
    speed: 500,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        500: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
};
const brandListProps = {
    loop: true,
    //   spaceBetween: 30,
    autoplay: true,
    speed: 500,
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        992: {
            slidesPerView: 5,
            spaceBetween: 30
        }
    }
};
const brandListProps2 = {
    loop: true,
    //   spaceBetween: 30,
    autoplay: true,
    speed: 500,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        400: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 30
        }
    }
};
const testimonial_list_slider = {
    loop: true,
    //   spaceBetween: 30,
    autoplay: true,
    speed: 500,
    pagination: {
        el: ".owl-dots",
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
};
const heroSlider = {
    loop: true,
    //   spaceBetween: 30,
    autoplay: true,
    speed: 500
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;