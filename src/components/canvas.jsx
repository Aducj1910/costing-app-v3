import React, { Component, useEffect, useRef } from "react";
import {
  getShirtMasks,
  getShirts,
  getPatterns,
  getPockets,
  getCollars,
} from "../services/photoService";

const Canvas = (props) => {
  const {
    xPattern,
    xShirt,
    xShirtMask,
    xPocket,
    xCollar,
    pickedColor,
    patternURL,
    patternArray,
  } = props;
  const canvasRef = useRef(null);
  // const patternArray = getPatterns();
  const shirtArray = getShirts();
  const shirtMaskArray = getShirtMasks();
  const pocketsArray = getPockets();
  const collarsArray = getCollars();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const drawShirt = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Number.isInteger(xPattern)) {
        let pattern = new Image();
        console.log(patternArray[xPattern].comp);
        pattern.src = patternArray[xPattern].comp;
        let shirt = shirtArray[xShirt].comp;
        let shirtMask = shirtMaskArray[xShirtMask];
        let pocket = pocketsArray[xPocket].comp;
        let collar = collarsArray[xCollar].comp;

        pattern.onload = function (ev) {
          ctx.drawImage(pattern, 0, 0, 600, 513);
          ctx.drawImage(shirt, 0, 0);
          ctx.drawImage(pocket, 10, 10);
          ctx.drawImage(collar, 1, 3.5);
          ctx.drawImage(shirtMask, 0, 0);
        };
      } else if (xPattern === "blank") {
        let shirt = shirtArray[xShirt].comp;
        let shirtMask = shirtMaskArray[xShirtMask];
        let pocket = pocketsArray[xPocket].comp;
        let collar = collarsArray[xCollar].comp;

        ctx.fillStyle = pickedColor;
        ctx.fillRect(0, 0, 600, 513);
        ctx.drawImage(shirt, 0, 0);
        ctx.drawImage(pocket, 10, 10);
        ctx.drawImage(collar, 1, 3.5);
        ctx.drawImage(shirtMask, 0, 0);
      } else if (xPattern === "custom") {
        console.log(patternURL);
        let shirt = shirtArray[xShirt].comp;
        let shirtMask = shirtMaskArray[xShirtMask];
        let pocket = pocketsArray[xPocket].comp;
        let collar = collarsArray[xCollar].comp;
        let pattern = new Image();
        pattern.src = patternURL;

        pattern.onload = function () {
          ctx.drawImage(pattern, 0, 0, 600, 513);
          ctx.drawImage(shirt, 0, 0);
          ctx.drawImage(pocket, 10, 10);
          ctx.drawImage(collar, 1, 3.5);
          ctx.drawImage(shirtMask, 0, 0);
        };
      }
    };
    drawShirt();
  });
  return <canvas width={700} height={500} ref={canvasRef} />;
};

export default Canvas;
