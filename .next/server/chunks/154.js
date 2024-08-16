"use strict";
exports.id = 154;
exports.ids = [154];
exports.modules = {

/***/ 8154:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3015);
/* harmony import */ var _sliderProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8544);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper_react__WEBPACK_IMPORTED_MODULE_1__, _sliderProps__WEBPACK_IMPORTED_MODULE_2__]);
([swiper_react__WEBPACK_IMPORTED_MODULE_1__, _sliderProps__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const bankLogos = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/159211/pexels-photo-159211.jpeg",
        alt: "Visa"
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/207217/pexels-photo-207217.jpeg",
        alt: "Mastercard"
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
        alt: "JPMorgan Chase"
    },
    {
        id: 4,
        image: "https://images.pexels.com/photos/159212/pexels-photo-159212.jpeg",
        alt: "HSBC"
    },
    {
        id: 5,
        image: "https://images.pexels.com/photos/546820/pexels-photo-546820.jpeg",
        alt: "Bank of America"
    },
    {
        id: 6,
        image: "https://images.pexels.com/photos/207218/pexels-photo-207218.jpeg",
        alt: "Citi"
    },
    {
        id: 7,
        image: "https://images.pexels.com/photos/159213/pexels-photo-159213.jpeg",
        alt: "Wells Fargo"
    },
    {
        id: 8,
        image: "https://images.pexels.com/photos/546821/pexels-photo-546821.jpeg",
        alt: "Barclays"
    }
];
const LogoSlider = ()=>{
    return /*#__PURE__*/ _jsx(Swiper, {
        ...brandListProps,
        className: "brand-list owl-carousel",
        children: bankLogos.map((logo)=>/*#__PURE__*/ _jsx(SwiperSlide, {
                children: /*#__PURE__*/ _jsx("div", {
                    className: "brand-single-box",
                    children: /*#__PURE__*/ _jsx("div", {
                        className: "brand-thumb",
                        children: /*#__PURE__*/ _jsx("img", {
                            src: logo.image,
                            alt: logo.alt,
                            style: {
                                width: "200px"
                            }
                        })
                    })
                })
            }, logo.id))
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (LogoSlider)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;