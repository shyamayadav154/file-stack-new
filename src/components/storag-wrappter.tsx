"use client";
import { setCookie } from 'cookies-next';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function StorageWrapper() {
  const searchParams = useSearchParams();
  const psw = searchParams.get("psw");
  //rendeer using useReducet

  useEffect(() => {
    if(!psw) return
    setCookie("psw", psw);
    // setValue(psw);
  }, [psw]);

  return null
}

export default StorageWrapper;
