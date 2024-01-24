import "./main.css";
import {jsx as $c4eSe$jsx} from "react/jsx-runtime";
import $c4eSe$react, {forwardRef as $c4eSe$forwardRef} from "react";
import $c4eSe$reactdomclient from "react-dom/client";
import {Slot as $c4eSe$Slot} from "@radix-ui/react-slot";
import {cva as $c4eSe$cva} from "class-variance-authority";
import {clsx as $c4eSe$clsx} from "clsx";
import {twMerge as $c4eSe$twMerge} from "tailwind-merge";
import {getCLS as $c4eSe$getCLS, getFID as $c4eSe$getFID, getFCP as $c4eSe$getFCP, getLCP as $c4eSe$getLCP, getTTFB as $c4eSe$getTTFB} from "web-vitals";














function $b167131307336e40$export$1343a74baacb0543(...inputs) {
    return (0, $c4eSe$twMerge)((0, $c4eSe$clsx)(inputs));
}


const $5d4afe4713bf9752$export$dca1ee5a936bb312 = (0, $c4eSe$cva)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
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
const $5d4afe4713bf9752$export$353f5b6fc5456de1 = /*#__PURE__*/ $c4eSe$forwardRef(({ className: className, variant: variant, size: size, asChild: asChild = false, ...props }, ref)=>{
    const Comp = asChild ? (0, $c4eSe$Slot) : "button";
    return /*#__PURE__*/ (0, $c4eSe$jsx)(Comp, {
        className: (0, $b167131307336e40$export$1343a74baacb0543)($5d4afe4713bf9752$export$dca1ee5a936bb312({
            variant: variant,
            size: size,
            className: className
        })),
        ref: ref,
        ...props
    });
});
$5d4afe4713bf9752$export$353f5b6fc5456de1.displayName = "Button";


const $87400e88260bad14$export$bf3bed7d90816f1c = (props)=>{
    console.log(props);
    const handleOnClick = (event)=>{
        var _window_open, _window;
        const url = `https://getcompound.co/sign-up?productId=${props.productId}`;
        (_window = window) === null || _window === void 0 ? void 0 : (_window_open = _window.open(url, "_blank")) === null || _window_open === void 0 ? void 0 : _window_open.focus();
    };
    var _props_label;
    return /*#__PURE__*/ (0, $c4eSe$jsx)((0, $5d4afe4713bf9752$export$353f5b6fc5456de1), {
        "data-testid": "compound-button",
        variant: "default",
        size: "lg",
        onClick: handleOnClick,
        children: (_props_label = props.label) !== null && _props_label !== void 0 ? _props_label : ""
    });
};


function $724141162d63a337$var$App(props) {
    return /*#__PURE__*/ (0, $c4eSe$jsx)("div", {
        children: /*#__PURE__*/ (0, $c4eSe$jsx)((0, $87400e88260bad14$export$bf3bed7d90816f1c), {
            productId: props.productId,
            label: props.label
        })
    });
}
var $724141162d63a337$export$2e2bcd8739ae039 = $724141162d63a337$var$App;



const $8a04a2dc6975b654$var$reportWebVitals = (onPerfEntry)=>{
    if (onPerfEntry && onPerfEntry instanceof Function) $8a04a2dc6975b654$importAsync$10d61e68b21cff.then(({ getCLS: getCLS, getFID: getFID, getFCP: getFCP, getLCP: getLCP, getTTFB: getTTFB })=>{
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
    });
};
var $8a04a2dc6975b654$export$2e2bcd8739ae039 = $8a04a2dc6975b654$var$reportWebVitals;


// Find all widget divs
const $0fce3c03a8b3340f$var$widgetDivs = document.querySelectorAll(".compound-widget");
// Inject our react app into all the widgets
$0fce3c03a8b3340f$var$widgetDivs.forEach((widget)=>{
    const root = (0, $c4eSe$reactdomclient).createRoot(widget);
    var _widget_dataset_label;
    root.render(/*#__PURE__*/ (0, $c4eSe$jsx)((0, $c4eSe$react).StrictMode, {
        children: /*#__PURE__*/ (0, $c4eSe$jsx)((0, $724141162d63a337$export$2e2bcd8739ae039), {
            productId: widget.dataset.productid,
            label: (_widget_dataset_label = widget.dataset.label) !== null && _widget_dataset_label !== void 0 ? _widget_dataset_label : "Save with Compound"
        })
    }));
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, $8a04a2dc6975b654$export$2e2bcd8739ae039)();


