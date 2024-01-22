// https://github.com/nuxy/slot-machine-gen/blob/master/demo/css/demo.css
// https://codesandbox.io/p/sandbox/test-slot-machine-tst32t?file=%2Fpackage.json%3A11%2C6-11%2C28
// https://codepen.io/josfabre/pen/abReBvP?editors=1111
import { useEffect } from "react";

const SlotMachine = ({ children }) => {
  // Width of the icons
  const icon_width = 100,
    // Height of one icon in the strip
    icon_height = 100,
    // Number of icons in the strip
    num_icons = 10,
    // Max-speed in ms for animating one icon down
    time_per_icon = 100,
    // Holds icon indexes
    indexes = [0, 0, 0];
  const roll = (reel, offset = 0, winner_num) => {
    // Minimum of 2 + the reel offset rounds
    const delta = (offset + 2) * num_icons + Math.floor(Math.random() * num_icons);
    console.log(delta, num_icons + +winner_num);

    // Return promise so we can wait for all reels to finish
    return new Promise((resolve, reject) => {
      const style = getComputedStyle(reel),
        // Current background position
        backgroundPositionY = parseFloat(style["background-position-y"]),
        // Target background position
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        // Normalized background position, for reset
        normTargetBackgroundPositionY =
          targetBackgroundPositionY % (num_icons * icon_height);

      // Delay animation with timeout, for some reason a delay in the animation property causes stutter
      setTimeout(() => {
        // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
        reel.style.transition = `background-position-y ${
          (9 + 1 * delta) * time_per_icon
        }ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${
          backgroundPositionY + delta * icon_height
        }px`;
      }, offset * 150);

      // After animation
      setTimeout(() => {
        // Reset position, so that it doesn't get higher without limit
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        // Resolve this promise
        resolve(delta % num_icons);
      }, (9 + 1 * delta) * time_per_icon + offset * 150);
    });
  };
  const rollAll = () => {
    const min = 0,
      max = 400;
    const randNum = Math.floor(Math.random() * max - min + 1 + min);
    let winner_num = String(randNum).padStart(3, "0");
    winner_num = [...winner_num];
    console.log(winner_num);
    const reelsList = document.querySelectorAll(".slots > .reel");
    Promise
      // Activate each reel, must convert NodeList to Array for this with spread operator
      .all([...reelsList].map((reel, i) => roll(reel, i, winner_num[i])))
      // When all reels done animating (all promises solve)
      .then((deltas) => {
        // add up indexes
        deltas.forEach(
          (delta, i) => (indexes[i] = (indexes[i] + delta) % num_icons)
        );

        // Win conditions
        if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
          const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
          document.querySelector(".slots").classList.add(winCls);
          setTimeout(
            () => document.querySelector(".slots").classList.remove(winCls),
            2000
          );
        }

        // Again!
        // setTimeout(rollAll, 3000);
      });
  }
  return (
    <>
      <div>
        <div id="slots" className="slots">
          <div className="reel"></div>
          <div className="reel"></div>
          <div className="reel"></div>
        </div>
        <div>
          <button onClick={rollAll}>Spin</button>
        </div>
      </div>
    </>
  );
};
export default SlotMachine;
