import React, { useEffect, useState } from "react";
import rain from "../../../public/icons/rain.svg";
import "./rain.css";
import Image from "next/image";

const amount = 15;

interface Icon {
  id: number;
  size: number;
  posX: number;
  delay: number;
  zIndex: number;
}

const Rain: React.FC = () => {
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    animateRains();
  }, []);

  const animateRains = () => {
    const newIcons: Icon[] = [];
    for (let i = 0; i < amount; i++) {
      const size = Math.random() * 10;
      const posX = Math.floor(Math.random() * 700);
      const delay = Math.floor(Math.random() * 5);
      const zIndex = delay > 0 ? 5 : 1;
      console.log(delay);
      newIcons.push({ id: i, size, posX, delay, zIndex });
    }
    setIcons(newIcons);
  };

  return (
    <div className="rain_block" id="rain">
      {icons.map((icon) => {
        return (
          <Image
            src={rain}
            key={icon.id}
            alt="rain"
            style={{
              position: "absolute",
              left: `${icon.posX}px`,
              width: `${icon.size}px`,
              animationDelay: `${icon.delay}s`,
              zIndex: `${icon.zIndex}`,
            }}
            className="rain_icon"
          />
        );
      })}
    </div>
  );
};

export default Rain;
