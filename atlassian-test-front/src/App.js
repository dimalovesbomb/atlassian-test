import './App.css';
import {Input} from "./components/Input";
import {Button} from "./components/Button";
import {useState} from "react";

const NO_DATA = 'NO_DATA';
const HAS_DATA = 'HAS_DATA';
const ERROR = 'ERROR';

const emptyResult = {
  name: '',
  temperature: '',
  weatherConditions: '',
  wind: '',
  pressure: '',
  humidity: ''
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('');
  const [status, setStatus] = useState(NO_DATA);
  const [result, setResult] = useState(emptyResult);

  const onButtonClickHandler = async () => {
    const res = await fetch(`https://9qvy74eq1l.execute-api.us-east-1.amazonaws.com/testFunc?city=${inputValue}`)
        .then(res => res.json());

    if (res.cod === 200) {
      const {name, main, weather, wind } = res;

      setStatus(HAS_DATA);
      setResult({
        name,
        temperature: main.temp,
        weatherConditions: weather[0].main,
        wind: wind.speed,
        pressure: main.pressure,
        humidity: main.humidity
      });
      setInputPlaceholder(inputValue);
      setInputValue('')
    } else {
      setStatus(ERROR);
      setInputPlaceholder(inputValue);
      setInputValue('')
    }
  };

  return (
    <div>
      <div className="container">
        <div className="inputs">
          <Input value={inputValue} setValue={setInputValue} placeholder={inputPlaceholder}/>
          <Button label="Search" onClickHandler={onButtonClickHandler} disabled={!inputValue.length}/>
        </div>
        {status === NO_DATA &&
            <div className="no-results">
              <p>Search for a city!</p>
            </div>
        }
        {status === HAS_DATA &&
          <div className="results">
            <h2>Results for {result.name}</h2>
            <p>Temperature: {result.temperature} &deg;C</p>
            <p>Weather conditions: {result.weatherConditions}</p>
            <p>Wind: {result.wind}</p>
            <p>Pressure: {result.pressure}</p>
            <p>Humidity: {result.humidity}</p>
          </div>
        }
        {status === ERROR &&
            <div>
              <h2>Error has occurred</h2>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
