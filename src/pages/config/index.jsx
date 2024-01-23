const Config = () => {
    const handleFile = () => {
      fetch('./api/handleFile')
    }
    return (
      <>
        <div>
          <h1>Config wheel</h1>
          <input type="file" />
        </div>
        <div>
          <h1>Config slot</h1>
          <ul className="flex flex-col">
            <li>
              min: <input className="border border-solid" type="text" />
            </li>
            <li>
              max: <input className="border border-solid" type="text" />
            </li>
          </ul>
        </div>
      </>
    );
    
}
export default Config