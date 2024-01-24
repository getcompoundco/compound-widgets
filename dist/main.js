require("./main.css");
var $ggB31$reactjsxruntime = require("react/jsx-runtime");
var $ggB31$react = require("react");
var $ggB31$reactdomclient = require("react-dom/client");
var $ggB31$radixuireactslot = require("@radix-ui/react-slot");
var $ggB31$classvarianceauthority = require("class-variance-authority");
var $ggB31$clsx = require("clsx");
var $ggB31$tailwindmerge = require("tailwind-merge");
var $ggB31$webvitals = require("web-vitals");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}













function $79017defaa86fa0b$export$1343a74baacb0543(...inputs) {
    return (0, $ggB31$tailwindmerge.twMerge)((0, $ggB31$clsx.clsx)(inputs));
}


const $7471022b0f422055$export$dca1ee5a936bb312 = (0, $ggB31$classvarianceauthority.cva)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const $7471022b0f422055$export$353f5b6fc5456de1 = /*#__PURE__*/ $ggB31$react.forwardRef(({ className: className, variant: variant, size: size, asChild: asChild = false, ...props }, ref)=>{
    const Comp = asChild ? (0, $ggB31$radixuireactslot.Slot) : "button";
    return /*#__PURE__*/ (0, $ggB31$reactjsxruntime.jsx)(Comp, {
        className: (0, $79017defaa86fa0b$export$1343a74baacb0543)($7471022b0f422055$export$dca1ee5a936bb312({
            variant: variant,
            size: size,
            className: className
        })),
        ref: ref,
        ...props
    });
});
$7471022b0f422055$export$353f5b6fc5456de1.displayName = "Button";


const $ce693c5cda73847f$export$bf3bed7d90816f1c = (props)=>{
    console.log(props);
    const handleOnClick = (event)=>{
        var _window_open, _window;
        const url = `https://getcompound.co/sign-up?productId=${props.productId}`;
        (_window = window) === null || _window === void 0 ? void 0 : (_window_open = _window.open(url, "_blank")) === null || _window_open === void 0 ? void 0 : _window_open.focus();
    };
    var _props_label;
    return /*#__PURE__*/ (0, $ggB31$reactjsxruntime.jsx)((0, $7471022b0f422055$export$353f5b6fc5456de1), {
        "data-testid": "compound-button",
        variant: "default",
        size: "lg",
        onClick: handleOnClick,
        children: (_props_label = props.label) !== null && _props_label !== void 0 ? _props_label : ""
    });
};


function $91b786905c14e19d$var$App(props) {
    return /*#__PURE__*/ (0, $ggB31$reactjsxruntime.jsx)("div", {
        children: /*#__PURE__*/ (0, $ggB31$reactjsxruntime.jsx)((0, $ce693c5cda73847f$export$bf3bed7d90816f1c), {
            productId: props.productId,
            label: props.label
        })
    });
}
var $91b786905c14e19d$export$2e2bcd8739ae039 = $91b786905c14e19d$var$App;



const $f8bc87b7efd23ac5$var$reportWebVitals = (onPerfEntry)=>{
    if (onPerfEntry && onPerfEntry instanceof Function) $f8bc87b7efd23ac5$importAsync$10d61e68b21cff.then(({ getCLS: getCLS, getFID: getFID, getFCP: getFCP, getLCP: getLCP, getTTFB: getTTFB })=>{
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
    });
};
var $f8bc87b7efd23ac5$export$2e2bcd8739ae039 = $f8bc87b7efd23ac5$var$reportWebVitals;


// Find all widget divs
const $89705e6c43d6e535$var$widgetDivs = document.querySelectorAll(".compound-widget");
// Inject our react app into all the widgets
$89705e6c43d6e535$var$widgetDivs.forEach((widget)=>{
    const root = (0, ($parcel$interopDefault($ggB31$reactdomclient))).createRoot(widget);
    var _widget_dataset_label;
    root.render(/*#__PURE__*/ (0, $ggB31$reactjsxruntime.jsx)((0, ($parcel$interopDefault($ggB31$react))).StrictMode, {
        children: /*#__PURE__*/ (0, $ggB31$reactjsxruntime.jsx)((0, $91b786905c14e19d$export$2e2bcd8739ae039), {
            productId: widget.dataset.productid,
            label: (_widget_dataset_label = widget.dataset.label) !== null && _widget_dataset_label !== void 0 ? _widget_dataset_label : "Save with Compound"
        })
    }));
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, $f8bc87b7efd23ac5$export$2e2bcd8739ae039)();


