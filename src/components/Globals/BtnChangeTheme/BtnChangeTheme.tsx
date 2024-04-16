"use client";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./icons/Moonicon";
import { SunIcon } from "./icons/SunIcon";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { getTheme, setCookie } from "../../../logic/cookies";
const BtnChangeTheme = () => {
  const theme = Cookie.get("theme");
  const [isSelected, setIsSelected] = useState<boolean>(
    theme === "dark" ? false : true
  );

  useEffect(() => {
    !isSelected
      ? setCookie({ name: "theme", value: "dark" })
      : setCookie({ name: "theme", value: "light" });
  }, [isSelected]);

  const handleChange = (e: boolean) => {
    setIsSelected(e);
  };
  return (
    <>
      <Switch
        defaultSelected
        size="lg"
        // color=""
        isSelected={isSelected}
        onValueChange={(e) => handleChange(e)}
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      ></Switch>
    </>
  );
};

export default BtnChangeTheme;
