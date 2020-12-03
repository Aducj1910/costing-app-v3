import React, { Component, useEffect, useRef } from "react";
import { InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { db, auth } from "../services/firebase";

const SetupCanvas = (props) => {
  const canvasRef = useRef(null);
  // const patternArray = getPatterns();
  const {
    componentURL,
    componentComp,
    maskComp,
    clearScreenSwitch,
    patternComp,
    removeBgSwitch,
    componentSaveSwitch,
  } = props;

  useEffect(() => {
    console.log(clearScreenSwitch);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // console.log(componentComp);

    const drawComponent = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let component = new Image();
      component.src = componentComp;

      let mask = new Image();
      mask.src = maskComp;

      let pattern = new Image();
      pattern.src = patternComp;

      component.onload = function (ev) {
        if (clearScreenSwitch) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.drawImage(component, 0, 0);
          ctx.drawImage(pattern, 0, 0);
          ctx.drawImage(mask, 0, 0);
        }

        if (removeBgSwitch) {
          let imgcap = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let imgd = imgcap.data;
          const replacementColor = { r: 0, g: 0, b: 0, a: 0 };

          for (var i = 0, n = imgd.length; i < n; i += 4) {
            let r = imgd[i];
            let g = imgd[i + 1];
            let b = imgd[i + 2];

            if (r === 7 && g === 0 && b === 140) {
              imgd[i] = replacementColor.r;
              imgd[i + 1] = replacementColor.g;
              imgd[i + 2] = replacementColor.b;
              imgd[i + 3] = replacementColor.a;
            }
          }
          ctx.putImageData(imgcap, 0, 0);
        }

        if (componentSaveSwitch) {
          let imgdata = canvas
            .toDataURL("imgdata/png")
            .replace("imgdata/png", "imgdata/octet-stream");

          db.collection("componentsFinal").add({
            comp: imgdata,
          });

          // window.location.href = imgdata;
          // console.log(imgdata);
        }
      };
    };

    drawComponent();
  });
  return <canvas width={700} height={500} ref={canvasRef} />;
};

export default SetupCanvas;
