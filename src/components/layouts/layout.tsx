import React, { useEffect, useState } from "react";
import "./layout.scss";
import { Header } from "./header";
import { Timer } from "../timer";

export const Layout = (props) => {
  const [visibleTimer, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (new Date("2023-05-17T21:00:00-04:00").getTime() > new Date().getTime())
      setVisible(true);
    else setVisible(false);
  }, []);
  return (
    <div className="layout-wrapper flex flex-col gap-50 px-[8vw] pt-60 md:pt-80 lg:pt-90 pb-50">
      <div />
      <Header balance={props.balance} />
      {visibleTimer && (
        <div>
          <Timer />
        </div>
      )}
      {props.children}
    </div>
  );
};
