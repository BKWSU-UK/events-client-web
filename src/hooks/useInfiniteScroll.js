import { useEffect } from "react";

const debounce = require("lodash.debounce");

export default function useInfiniteScroll(onBottomReached, debounceWait = 500) {
  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const devicePixelRatio = window.devicePixelRatio;
      const clientHeight =
        window.innerHeight *
        (devicePixelRatio >= 1 ? devicePixelRatio : 1 + 1 - devicePixelRatio);
      console.info(
        "scrollTop, clientHeight, scrollHeight",
        scrollTop,
        clientHeight,
        scrollHeight,
      );
      console.info("scrollTop + clientHeight", scrollTop + clientHeight);
      if (scrollTop + clientHeight >= scrollHeight) {
        console.info("useInfiniteScroll: onBottomReached");
        onBottomReached();
      }
    }
    const debouncedHandleScroll = debounce(handleScroll, debounceWait);
    window.addEventListener("scroll", debouncedHandleScroll);
    console.info("added scroll listener");
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [onBottomReached, debounceWait]);
}
