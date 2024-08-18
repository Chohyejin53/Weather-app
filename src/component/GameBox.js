import React, { useState, useEffect } from "react";
import rockImg from "../assets/rock.png";
import scissorsImg from "../assets/scissors.png";
import paperImg from "../assets/paper.png";

const GameBox = (props) => {
  const [currentImageAnimationIndex, setImageAnimationIndex] = useState(0);
  const imageAnimationIndex = [rockImg, scissorsImg, paperImg];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageAnimationIndex(
        (prevIndex) => (prevIndex + 1) % imageAnimationIndex.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [imageAnimationIndex.length]);

  const getResultClass = () => {
    return props.result === "win"
      ? "color-green"
      : props.result === "lose"
      ? "color-red"
      : "color-black";
  };

  return (
    <div className={`box ${getResultClass()}`}>
      <h1 className="title">{props.title}</h1>
      <div className="img-area">
        <img
          src={
            (props.item && props.item.img) ||
            imageAnimationIndex[currentImageAnimationIndex]
          }
          alt={
            (props.item && props.item.name) ||
            imageAnimationIndex[currentImageAnimationIndex]
          }
        />
      </div>
      <p className="result-text">{props.result}</p>
    </div>
  );
};

export default GameBox;
