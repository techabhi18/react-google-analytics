import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });

        const handleClick = (event) => {
            const element = event.target;

            const tag = element.tagName;
            const id = element.id ? `#${element.id}` : "";
            const classes = element.className
                ? `.${element.className.trim().split(" ").join(".")}`
                : "";
            const text = element.innerText
                ? element.innerText.trim().substring(0, 100)
                : "";

            const label = `Element: ${tag}${id}${classes} | Text: "${text}" | Page: ${location.pathname}`;

            ReactGA.event({
                category: "User Interaction",
                action: "Element Click",
                label: label,
            });
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [location]);

    return null;
}

export default AnalyticsTracker;
