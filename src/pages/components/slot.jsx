// https://github.com/nuxy/slot-machine-gen/blob/master/demo/css/demo.css
// https://codesandbox.io/p/sandbox/test-slot-machine-tst32t?file=%2Fpackage.json%3A11%2C6-11%2C28
import { useEffect } from "react";

const SlotMachine = ({ children }) => {
  const reels = [
    {
      imageSrc: "../images/reel-strip1.png",
      symbols: [
        {
          title: "cherry",
          position: 100,
          weight: 2,
          imgSrc: "../images/num0.png",
        },
        {
          title: "plum",
          position: 300,
          weight: 6,
          imgSrc: "../images/num1.png",
        },
        {
          title: "orange",
          position: 500,
          weight: 5,
          imgSrc: "../images/num2.png",
        },
        {
          title: "bell",
          position: 700,
          weight: 1,
          imgSrc: "../images/num3.png",
        },
        {
          title: "cherry",
          position: 900,
          weight: 3,
          imgSrc: "../images/num4.png",
        },
        {
          title: "plum",
          position: 1100,
          weight: 5,
          imgSrc: "../images/num5.png",
        },
      ],
    },
    {
      imageSrc: "../images/reel-strip2.png",
      symbols: [
        {
          title: "orange",
          position: 100,
          weight: 6,
          imgSrc: "../images/num0.png",
        },
        {
          title: "plum",
          position: 300,
          weight: 5,
          imgSrc: "../images/num1.png",
        },
        {
          title: "orange",
          position: 500,
          weight: 3,
          imgSrc: "../images/num2.png",
        },
        {
          title: "plum",
          position: 700,
          weight: 5,
          imgSrc: "../images/num3.png",
        },
        {
          title: "cherry",
          position: 900,
          weight: 2,
          imgSrc: "../images/num4.png",
        },
        {
          title: "bell",
          position: 1100,
          weight: 1,
          imgSrc: "../images/num5.png",
        },
      ],
    },
    {
      imageSrc: "../images/reel-strip3.png",
      symbols: [
        {
          title: "cherry",
          position: 100,
          weight: 4,
          imgSrc: "../images/num0.png",
        },
        {
          title: "bell",
          position: 300,
          weight: 1,
          imgSrc: "../images/num1.png",
        },
        {
          title: "orange",
          position: 500,
          weight: 6,
          imgSrc: "../images/num2.png",
        },
        {
          title: "plum",
          position: 700,
          weight: 5,
          imgSrc: "../images/num3.png",
        },
        {
          title: "plum",
          position: 900,
          weight: 3,
          imgSrc: "../images/num4.png",
        },
        {
          title: "cherry",
          position: 1100,
          weight: 2,
          imgSrc: "../images/num5.png",
        },
      ],
    },
  ];
  let isAnimating = true
  const REEL_SEGMENT_TOTAL = 24;
  const options = {
    reelHeight: 1200,
    reelWidth: 200,
    reelOffset: 20,
    slotYAxis: 0,
    animSpeed: 1000,
    sounds: {
      reelsBegin: null,
      reelsEnd: null,
    },
    rngFunc: function () {
      // The weakest link.
      return Math.random();
    },
  };
  const createDisplayElm = () => {
    const container = document.querySelector(".slot-machine");
    const div = document.createElement("div");
    div.classList.add("display");

    for (let i = 0; i < reels.length; i++) {
      const elm = document.createElement("div");
      elm.style.transform = `rotateY(${options.slotYAxis}deg)`;
      elm.classList.add("reel");
      console.log(i);
      div.appendChild(elm);
    }

    div.addEventListener("click", () => spinReels());

    container.appendChild(div);
  };
  const createSlotElm = () => {
    const container = document.querySelector(".slot-machine");
    const div = document.createElement("div");
    div.classList.add("slots");
    reels.forEach((reel) => {
      const elm = createReelElm(reel, reel.symbols[0].position);
      div.appendChild(elm);
    });
    container.appendChild(div);
  };
  const createReelElm = (config, startPos = 0) => {
    const div = document.createElement("div");
    div.style.transform = `rotateY(${options.slotYAxis}deg)`;
    div.classList.add("reel");

    const elm = createStripElm(config, config.symbols[0].position);
    console.log(elm);

    config["element"] = elm;
    div.appendChild(elm);

    return div;
  };
  const createStripElm = (config, startPos = 0) => {
    const stripHeight = getStripHeight();
    const stripWidth = getStripWidth();

    const segmentDeg = 360 / REEL_SEGMENT_TOTAL;

    const transZ = Math.trunc(
      Math.tan(90 / Math.PI - segmentDeg) * (stripHeight * 0.5) * 4
    );

    const marginTop = transZ + stripHeight / 2;

    const ul = document.createElement("ul");
    ul.style.height = stripHeight + "px";
    ul.style.marginTop = marginTop + "px";
    ul.style.width = stripWidth + "px";
    console.log(stripHeight, stripWidth);
    ul.classList.add("strip");

    for (let i = 0; i < REEL_SEGMENT_TOTAL; i++) {
      const li = document.createElement("li");
      li.append(i.toString());

      const imgPosY = getImagePosY(i, startPos);
      const rotateX = REEL_SEGMENT_TOTAL * segmentDeg - i * segmentDeg;

      // Position image per the strip angle/container radius.
      li.style.background = `url(${config.imageSrc}) 0 ${imgPosY}px`;
      li.style.height = stripHeight + "px";
      li.style.width = stripWidth + "px";
      li.style.transform = `rotateX(${rotateX}deg) translateZ(${transZ}px)`;

      ul.appendChild(li);
    }

    return ul;
  };
  const getStripHeight = () => {
    return options.reelHeight / REEL_SEGMENT_TOTAL;
  };
  const getStripWidth = () => {
    return options.reelWidth;
  };
  const getImagePosY = (index, position) => {
    return -Math.abs(
      getStripHeight() * index + (position - options.reelOffset)
    );
  };
  const getRandom = () => {
    return options.rngFunc();
  };

  const callback = (payLine) => {
    // Pay lines consist of an array of symbols[], first payline being 0 → ∞
    console.log(
      payLine[0].title + " | " + payLine[1].title + " | " + payLine[2].title
    );

    // If all three symbols match..
    if (
      payLine[0].title === payLine[1].title &&
      payLine[0].title === payLine[2].title
    ) {
      //   new Audio("sounds/winner.mp3").play();

      // .. payout winnings
      switch (payLine[0].title) {
        case "bell":
          winnings += 50;
          break;

        case "cherry":
          winnings += 25;
          break;

        case "orange":
          winnings += 10;
          break;

        case "plum":
          winnings += 5;
          break;
      }

      //   credits.innerText = winnings;
    }

    // button.disabled = false;
  };
  const getRandomInt = (min = 1, max = 10) => {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);

    return Math.floor(getRandom() * (Math.floor(maxNum) - minNum)) + minNum;
  };
  const selectRandSymbol = (symbols) => {
    let totalWeight = 0;

    const symbolTotal = symbols.length;

    for (let i = 0; i < symbolTotal; i++) {
      const symbol = symbols[i];
      const weight = symbol.weight;

      totalWeight += weight;
    }

    let randNum = getRandom() * totalWeight;

    for (let j = 0; j < symbolTotal; j++) {
      const symbol = symbols[j];
      const weight = symbol.weight;

      if (randNum < weight) {
        return symbol;
      }

      randNum -= weight;
    }
  };
  const spinReels = (self) => {
    console.log(self);
    const payLine = [];

    if (callback) {
      // Delay callback until animations have stopped.
      payLine.push = function () {
        Array.prototype.push.apply(this, arguments);

        if (payLine.length === reels.length) {
          window.setTimeout(() => {
            isAnimating = false;

            callback(payLine);
          }, options.animSpeed);
        }
      };
    }

    // playSound(options.sounds.reelsBegin);

    reels.forEach((reel) => {
      const selected = selectRandSymbol(reel.symbols);
      const startPos = selected.position;

      // Start the rotation animation.
      const elm = reel.element;
      elm.classList.remove("stop");
      elm.classList.toggle("spin");

      // Shift images to select position.
      // elm.childNodes.forEach((li, index) => {
      //   li.style.backgroundPositionY = getImagePosY(index, startPos) + "px";
      // });

      // Randomly stop rotation animation.
      window.setTimeout(() => {
        elm.classList.replace("spin", "stop");

        // playSound(options.sounds.reelsEnd);

        payLine.push(selected);
      }, options.animSpeed * getRandomInt(1, 4));
    });
  };
  useEffect(() => {
    createDisplayElm();
    createSlotElm();
  }, []);
  return <div id="slot-machine" className="slot-machine"></div>;
};
export default SlotMachine;
