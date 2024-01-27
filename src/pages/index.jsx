import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter()
  return(
    <div className="hufflit-home">
      <div className="fixed right-0 bottom-0 flex flex-col">
        <button onClick={() => {router.push('/wheel')}}>
          <span class="material-symbols-outlined">
            attractions
          </span>
        </button>
        <button onClick={() => { router.push('/slot') }}>
          <span class="material-symbols-outlined">
            apps
          </span>
        </button>
      </div>
    </div>
  )  
};
export default Home;
