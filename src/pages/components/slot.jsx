import store from "@/redux";
import { configSlicer } from "@/redux/commonSlicer/configSlicer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SlotMachine = ({ children }) => {
  const max = useSelector((state) => state.configSlicer.max);
  const min = useSelector(state => state.configSlicer.min);
  const listWinnerNum = useSelector(state => state.configSlicer.listWinnerNum);
  const [listWinNum, setListWinNum] = useState([])
  const icon_width = 100,
    icon_height = 100,
    num_icons = 10,
    time_per_icon = 100,
    indexes = [0, 0, 0];
  const roll = (reel, offset = 0, winner_num) => {
    const delta = (offset + 2) * num_icons + (num_icons - +winner_num + 1);
    console.log(delta, num_icons + +winner_num);

    return new Promise((resolve, reject) => {
      const style = getComputedStyle(reel),
        
        backgroundPositionY = parseFloat(style["background-position-y"]),
        
        targetBackgroundPositionY = backgroundPositionY + (delta * icon_height - backgroundPositionY),
        
        normTargetBackgroundPositionY =
          targetBackgroundPositionY % (num_icons * icon_height);
          console.log(targetBackgroundPositionY, delta, backgroundPositionY);

      setTimeout(() => {
        reel.style.transition = `background-position-y ${
          (9 + 1 * delta) * time_per_icon
        }ms cubic-bezier(.41,-0.01,.63,1.09)`;
        reel.style.backgroundPositionY = `${
          backgroundPositionY + (delta * icon_height - backgroundPositionY)
        }px`;
      }, offset * 150);

      setTimeout(() => {
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % num_icons);
      }, (9 + 1 * delta) * time_per_icon + offset * 150);
    });
  };
  const random_winner = () => {
    let randNum = Math.floor(Math.random() * max - min + 1 + min);
    if (listWinnerNum.length === max) {
      store.dispatch(configSlicer.actions.setListWinnerNum([]))
      return randNum;
    }
    while (listWinnerNum.includes(randNum)) {
      console.log('re random', randNum);
      randNum = Math.floor(Math.random() * max - min + 1 + min);
    }
    store.dispatch(configSlicer.actions.setListWinnerNum([...listWinnerNum, randNum]))
    return randNum;
  }
  const rollAll = () => {
    // const min = 0,
    //   max = 400;
    let randNum = random_winner()
    
    
    console.log(listWinnerNum ,randNum);
    let winner_num = String(randNum).padStart(3, "0");
    winner_num = [...winner_num];
    console.log(winner_num);
    const reelsList = document.querySelectorAll(".slots > .reel");
    Promise
      .all([...reelsList].map((reel, i) => roll(reel, i, winner_num[i])))
      .then((deltas) => {
        deltas.forEach(
          (delta, i) => (indexes[i] = (indexes[i] + delta) % num_icons)
        );
        document.querySelector(".slots")?.classList?.add("win1");
        setTimeout(
          () => document.querySelector(".slots")?.classList?.remove('win1'),
          2000
        );
      });
  }
  const topSpin = () => {
    const reelsList = document.querySelectorAll(".slots > .reel");
    [...reelsList].forEach(reel => {
      reel.style.transition = `none`;
    })
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div id="slots" className="slots">
          <div className="reel"></div>
          <div className="reel"></div>
          <div className="reel"></div>
        </div>
        <div className="">
          <button type="button" className="text-md font-semibold leading-6 bg-gray-400 p-5 mt-5 rounded" onClick={rollAll}>Spin</button>
          {/* <button onClick={topSpin}>Top Spin</button> */}
        </div>
      </div>

    </>
  );
};
export default SlotMachine;
