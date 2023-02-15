import React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { SvgMoon } from "./svgs/SvgMoon";
import { SvgSun } from "./svgs/SvgSun";

const ThemeToggler = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  if (currentTheme === "dark") {
    return <SvgSun onClick={() => setTheme("light")} />;
  } else {
    return <SvgMoon onClick={() => setTheme("dark")} />;
  }
};

export default ThemeToggler;
