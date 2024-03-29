import { useRouter } from "next/router"
import SlotMachine from "../components/slot"
import { useEffect } from "react";
import store from "@/redux";
import { configSlicer } from "@/redux/commonSlicer/configSlicer";

const Slot = () => {
    const router = useRouter();
    useEffect(() => {
        // store.dispatch(configSlicer.actions.setListWinnerNum([]))
    }, [])
    return (<>
        <div className="hufflit_slot">
            <div className="fixed left-1/4 bottom-64 ml-32" style={{ bottom: '4rem', marginLeft: '-12rem'}}>
                <SlotMachine></SlotMachine>
            </div>
            <div className="fixed right-0 bottom-0 flex flex-col">
                <button onClick={() => { router.push('/wheel')}}>
                    <span class="material-symbols-outlined">
                        attractions
                    </span>
                </button>
                <button onClick={() => {
                    router.push('/config')
                }}>
                    <span class="material-symbols-outlined">settings</span>
                </button>
            </div>
        </div>
    </>)
}
export default Slot