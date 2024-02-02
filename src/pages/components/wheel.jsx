import React, { useEffect, useState } from "react";

const WheelComponent = ({
countSegments,
  segments = [],
  segColors,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "",
  isOnlyOnce = true,
  size = 376,
  upDuration = 100,
  downDuration = 300,
  fontFamily = "Arial",
}) => {
  let currentSegment = "";
  let currentSegmentIndex = 0;
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length / 2;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / `${segments.length}`;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = 495;
  const centerY = 435;
  useEffect(() => {
    // console.log("render wheel");
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);
  
  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };
// useEffect(() => {
    
//   if (countSegments > 0) {
//     angleCurrent = 0;
//     angleDelta = 0;
//     timerHandle = 0;
//     canvasContext = null;
//     frames = 0;
//    let canvas = document.getElementById("canvas");
//    canvas.addEventListener("click", spin, false);
//    canvasContext = canvas.getContext("2d");
//    drawWheel()
//   }
// }, [countSegments]);
  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    // console.log(navigator);
    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", 1000);
      canvas.setAttribute("height", 600);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };
  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };
  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      console.log(currentSegmentIndex);
      onFinished({ winner: currentSegment , index: currentSegmentIndex});
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = key % 2 === 0 ? '#FFB016' : '#DD0606';
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = key % 2 === 0 ? '#E43030' : '#FFDF8B';
    ctx.font = "bold 1.6em " + fontFamily;
    ctx.fillText(value?.substr(0, 21).toUpperCase(), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    const background =  new Image();
    background.src = "./images/wheel_border.png"
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 49, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'blue';
    ctx.fill();
  
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = 'blue';
    ctx.textAlign = "center";
    // ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    // background.onload = () => {
    //   ctx.drawImage(background, 0, 0)
    // }
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#FF1F1F";
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = i % 2 === 0 ? '#E43030' : '#FFDF8B';
    ctx.font = "bold 1.6em " + fontFamily;
    currentSegment = segments[i];
    currentSegmentIndex = i;
    // isStarted &&
    //   ctx.fillText(i % 2 === 0 ? '#FFB016' : '#DD0606', centerX + 10, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };
  return (
    <div id="wheel">
      <canvas
        id="canvas"
        width="1000"
        height="1000"
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          backgroundImage: "url('./images/wheel_border.png')",
          backgroundPositionY: '-55px',
          backgroundRepeat:'no-repeat'
        }}
      />
    </div>
  );
};
export default WheelComponent;
