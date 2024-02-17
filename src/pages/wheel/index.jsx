import React, { useEffect, useReducer, useState } from "react";
import WheelComponent from "../components/wheel";
import { useSelector } from "react-redux";
import { wheelSlice } from "@/redux/commonSlicer/wheelSlicer";
import store from "@/redux";
import _ from "lodash";
import { useRouter } from "next/router";
const Wheel = () => {
  const router = useRouter();
  const segments = useSelector((state) => state.wheelSlicer.segments);
  const segColors = useSelector((state) => state.wheelSlicer.segColors);
  const segmentsBK = useSelector((state) => state.wheelSlicer.segmentsBK);
  const segColorsBK = useSelector((state) => state.wheelSlicer.segColorsBK);
  useEffect(() => {
    randomColor();
  }, []);
  const [state, updateState] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      quantity: 0,
      countSegments: 0,
      showWinnerPopup: false,
      winner: "",
      indexOfItem: 0,
    }
  );
  const onFinished = (item) => {
    console.log(item.winner, item.index);
    updateState({
      showWinnerPopup: true,
      winner: item.winner,
      indexOfItem: item.index,
    });
  };
  const onReset = () => {
    store.dispatch(wheelSlice.actions.setSegments(segmentsBK));
    store.dispatch(wheelSlice.actions.setSegColors(segColorsBK));
    updateState({ countSegments: state.countSegments + 1 });
  };
  const onClosed = () => {
    const tempSegments = _.cloneDeep(segments);
    const tempSegColors = _.cloneDeep(segColors);
    const removedSegments = tempSegments.splice(state.indexOfItem, 1);
    const removedSegColors = tempSegColors.splice(state.indexOfItem, 1);
    store.dispatch(wheelSlice.actions.setSegColors(tempSegColors));
    store.dispatch(wheelSlice.actions.setSegments(tempSegments));
    updateState({ countSegments: state.countSegments + 1 });
    updateState({ showWinnerPopup: false });
  };

  const randomColor = (segmentsLength) => {
    let segColors = [];
    for (let i = 0; i < segmentsLength; i++) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      segColors.push("#" + randomColor);
    }
    return segColors;
  };
  const setQuantitySegments = (quantity) => {
    console.log(quantity);
    let segments = [];
    updateState({ quantity });
    for (let i = 0; i < quantity; i++) {
      segments.push(`Segment ${i + 1}`);
    }
    console.log(segments);
    let segColors = randomColor(segments.length);
    store.dispatch(wheelSlice.actions.setSegmentsBK(segments));
    store.dispatch(wheelSlice.actions.setSegColorsBK(segColors));
    store.dispatch(wheelSlice.actions.setSegments(segments));
    store.dispatch(wheelSlice.actions.setSegColors(segColors));
    updateState({
      segments: segments,
      segColors: segColors,
      countSegments: segments.length,
    });
  };
  return (
    <>
      <div className="flex flex-col hufflit_wheel">
        <div className="fixed top-32 left-0 ml-10" key={state.countSegments}>
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment=""
            onFinished={(winner) => onFinished(winner)}
            primaryColor="yellow"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            countSegments={state.countSegments}
          />
        </div>
        <div className="">
          <div>
          </div>
          
        </div>
      </div>
      <div className="fixed right-0 bottom-0 flex flex-col">
        {/* <button>
          <span class="material-symbols-outlined">
            attractions
          </span>
        </button> */}
        <button onClick={onReset}>
          <span class="material-symbols-outlined">
            restart_alt
          </span>
        </button>
        <button onClick={() => {router.push('/slot')}}>
          <span class="material-symbols-outlined">
            apps
          </span>
        </button>
        <button onClick={() => {
          router.push('/config')
        }}>
          <span class="material-symbols-outlined">settings</span>
        </button>
      </div>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`
        grid h-screen place-items-center
        ${
          !state.showWinnerPopup && "hidden"
        }  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative flex justify-center p-4 w-full max-h-full w-screen">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{ borderRadius: '8px', background: 'linear-gradient(45deg, #FF3838, #CF0000)'}}>
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => onClosed()}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                style={{ color: '#FFD600'}}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              {/* <span className="sr-only">Close modal</span> */}
            </button>
            <div className="p-4 md:p-5 text-center" style={{ border: '5px solid #FF9314', borderRadius: '8px'}}>
              {/* <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg> */}
              <div className="mt-5 font-medium text-2xl " style={{ color: "#FFD600", fontSize: '35px'}}>
                XIN CHÚC MỪNG
              </div>
              <div className="flex flex-col items-center justify-center mt-5 text-xl font-normal w-full h-20" style={{background:'white'}}>
                <p className="px-5 py-5" style={{ color: "#E00000", fontSize: '40px', fontFamily: 'Arial', textTransform: 'uppercase' }}>{state.winner}</p>
              </div>
              {/* <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                onClick={() => onClosed()}
              >
                Đóng
              </button> */}
              {/* <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Wheel;
