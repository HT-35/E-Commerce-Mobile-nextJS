"use client";
import { useEffect, useState } from "react";

// render side ==>   setHasMounted(true);
export const useHasMounted = async () => {
  const [hasMoused, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMoused;
};
