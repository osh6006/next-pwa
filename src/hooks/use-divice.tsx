import { isPwa as getIsPWA, isIOS as getIsIOS } from "@/utils/common";
import { useEffect, useState } from "react";

export default function useDivice() {
  const [isIOS, setIsIOS] = useState(false);
  const [isPWA, setISPWA] = useState(false);

  const [] = useState();
  useEffect(() => {
    setIsIOS(getIsIOS());
    setISPWA(getIsPWA());
  }, []);

  return { isIOS, isPWA };
}
