import {useEffect} from "react";
const debounce = require("lodash.debounce");


export default function useInfiniteScroll(onBottomReached, debounceWait = 500) {
  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const devicePixelRatio = window.devicePixelRatio;
      const clientHeight =
        window.innerHeight *
        (devicePixelRatio >= 1 ? devicePixelRatio : 1 + 1 - devicePixelRatio);
      if (scrollTop + clientHeight >= scrollHeight) {
        onBottomReached();
      }
    }
    const debouncedHandleScroll = debounce(handleScroll, debounceWait);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [onBottomReached]);
}