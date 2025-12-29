"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Download = () => {
  const [isTwa, setIsTwa] = useState(false);

  useEffect(() => {
    function detectStandalone() {
      if (window.matchMedia?.("(display-mode: standalone)").matches) {
        return true;
      }
      if ((navigator as any).standalone === true) {
        return true; // iOS
      }
      if (/; wv\)/.test(navigator.userAgent)) {
        return true; // Android WebView
      }
      return false;
    }
    setIsTwa(detectStandalone());
  }, []);

  return (
    !isTwa && (
      <div className="p-6">
        <div className="w-32">
          <Link
            href="https://myket.ir/app/ir.locstar.twa"
            className="w-fit"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img
              src="/icons/logo-myket.svg"
              alt=""
              className="bg-white shadow-core rounded-xl px-4 py-2"
            />
          </Link>
        </div>
      </div>
    )
  );
};

export default Download;
