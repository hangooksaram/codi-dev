import ReactGA from "react-ga4";

const initializeGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID as string);
};

const trackGAEvent = (category:string, action:string, label:string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default initializeGA;
export { initializeGA, trackGAEvent };