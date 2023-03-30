import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [quo, setQuo] = useState("");
  const [QuoList,setQuoList] = useState([])

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            width: 600
        }}
    />
);

  const addquo = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      quote: quo,
    }).then(()=>{
      console.log("success!");
    })
  };

  const getquo = () => {
    Axios.get("http://localhost:3001/quote").then((response)=>{
      console.log(response);
      setQuoList(response.data);

    })
  };

  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <label>Quote:</label>
        <input
          type="text"
          onChange={(event) => {
            setQuo(event.target.value);
          }}
        />
        <button onClick={addquo}>Add Quote</button>
      </div>
      <ColoredLine color="red" />
      <div className="quo">
        <button onClick={getquo}> Show All</button>
        {QuoList.map( (val,key) => {
          return <div className="getq"> 
          <h3>{val.name}</h3>
          <h4>{val.quot}</h4>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;