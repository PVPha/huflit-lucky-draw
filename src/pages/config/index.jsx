import * as XLSX from 'xlsx';
import { wheelSlice } from "@/redux/commonSlicer/wheelSlicer";
import store from "@/redux";
import { useRouter } from 'next/router';
import { configSlicer } from '@/redux/commonSlicer/configSlicer';
import { useSelector } from 'react-redux';
import { useReducer } from 'react';
const Config = () => {
  const Router = useRouter();
  const maxSlot = useSelector(state => state.configSlicer.max);
  const minSlot = useSelector(state => state.configSlicer.min);
  const [state, updateState]  = useReducer((next, prev) => {
    return {...next, ...prev}
  }, {
    maxSlot: 0,
    minSlot: 0
  })
  const handleFile = (event) => {
    const input = document.querySelector('input[type="file"]');
    const file = input.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      const buffer = event.target.result;
      const wb = XLSX.read(buffer, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      console.log(data);
      //set segments of wheel
      let segments = [];
      for (let i = 0; i < data.length; i++) {
        segments.push(data[i].Name);
      }
      console.log(segments);
      let segColors = randomColor(segments.length);
      store.dispatch(wheelSlice.actions.setSegmentsBK(segments));
      store.dispatch(wheelSlice.actions.setSegColorsBK(segColors));
      store.dispatch(wheelSlice.actions.setSegments(segments));
      store.dispatch(wheelSlice.actions.setSegColors(segColors));
    }
  }
  const randomColor = (segmentsLength) => {
    let segColors = [];
    for (let i = 0; i < segmentsLength; i++) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      segColors.push("#" + randomColor);
    }
    return segColors;
  };
  const setMaxSlot = (number) => {
    store.dispatch(configSlicer.actions.setMax(number))
  }
  const setMinSlot = (number) => {
    store.dispatch(configSlicer.actions.setMin(number))
  }
  const configSlot = (event) => {
    event.preventDefault()
    const minSlot = document.querySelector('.minSlot');
    const maxSlot = document.querySelector('.maxSlot');
    setMaxSlot(maxSlot.value);
    setMinSlot(minSlot.value);
  }
  return (
    <><div className='ml-5 mt-5'>

      <div className='flex flex-col'>
        <h1>Config wheel</h1>
        <input type="file" />
        <button onClick={handleFile} className='w-36 text-md font-semibold leading-6 bg-gray-400 p-5 mt-5 rounded'>Config wheel</button>
      </div>
      <div className='mt-8'>
        <h1>Config slot</h1>
        <form>

        <ul className="flex flex-col">
          <li>
            min: <input className="minSlot border border-solid" type="number" required placeholder={minSlot} onChange={(event) => {
              console.log(event.target.value);
            }}/>
          </li>
          <li>
            max: <input className="maxSlot border border-solid" type="number" required  placeholder={maxSlot} onChange={(event) => {
              console.log(event.target.value);
            }}/>
          </li>
        </ul>
        <button type='submit' onClick={() =>  {configSlot(event)}} className='text-md font-semibold leading-6 bg-gray-400 p-5 mt-5 rounded'>Config slot</button>
        </form>
      </div>
      <div className='mt-8'>
        <button className='bg-lime-300 mr-5 p-5 rounded' onClick={() => {
          Router.push('/wheel')
        }}>Wheel</button>
        <button className='bg-yellow-300 p-5 rounded' onClick={() => {
          Router.push('/slot')
        }}>Slot</button>
      </div>
    </div>
    </>
  );

}
export default Config