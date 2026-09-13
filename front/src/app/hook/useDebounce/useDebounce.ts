"use client";
import { useEffect, useState } from "react";

type DebounceProps = {
  value: string;
  delay?: number;
};

export default function useDebounce({ value, delay = 500 }: DebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
