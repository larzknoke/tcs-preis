import "nprogress/nprogress.css";

import { useEffect } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";

export default function ProgressBar() {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);

  return (
    <style>
      {`
        #nprogress .bar {
          height: 3px;
          background: #b2c243 !important;
        }
        #nprogress .peg {
          box-shadow: 0 0 10px #b2c243, 0 0 5px #b2c243;
        }

        #nprogress .spinner .spinner-icon {
          border-top-color: #b2c243;
          border-left-color: #b2c243;
        }
     `}
    </style>
  );
}
