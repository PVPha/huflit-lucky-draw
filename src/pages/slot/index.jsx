import { useRouter } from "next/router"
import SlotMachine from "../components/slot"

const Slot = () => {
    const router = useRouter();
    return (<>
        <div className="hufflit">
            <div className="fixed left-0 top-1/4 ml-32">
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