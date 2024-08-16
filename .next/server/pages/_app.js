(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./src/ConsenHead.js


const ConsenHead = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                charSet: "UTF-8"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                httpEquiv: "x-ua-compatible",
                content: "ie=edge"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: "Apex Trust"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: ""
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                type: "image/png",
                sizes: "56x56",
                href: "/dashlogo.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/bootstrap.min.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/animate.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/animated-text.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/all.min.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/flaticon.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/theme-default.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/meanmenu.min.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/owl.transitions.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "venobox/venobox.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/bootstrap-icons.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/style.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/magnific-popup.css",
                type: "text/css",
                media: "all"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "assets/css/responsive.css",
                type: "text/css",
                media: "all"
            })
        ]
    });
};
/* harmony default export */ const src_ConsenHead = (ConsenHead);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/layout/Preloader.js


const Preloader = ()=>{
    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector("body").classList.add("loaded");
        }, 2000);
    }, []);
    return /*#__PURE__*/ _jsxs("div", {
        className: "loader-wrapper",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "loader"
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "loder-section left-section"
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "loder-section right-section"
            })
        ]
    });
};
/* harmony default export */ const layout_Preloader = ((/* unused pure expression or super */ null && (Preloader)));

// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
;// CONCATENATED MODULE: ./pages/_app.js





const App = ({ Component , pageProps  })=>{
    const [loding, setLoding] = (0,external_react_.useState)(true);
    // setTimeout(() => {
    //   setLoding(false);
    // }, 1500);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(src_ConsenHead, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        ]
    });
};
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6825));
module.exports = __webpack_exports__;

})();