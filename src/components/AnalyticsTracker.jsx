import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });

        const handleClick = (event) => {
            ReactGA.event({
                category: "User Interaction",
                action: "Clicked Page",
                label: `Clicked at X: ${event.clientX}, Y: ${event.clientY} on ${location.pathname}`,
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
