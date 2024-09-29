import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Screen from "./components/Screen";
import Button from "./components/Button";

function App() {
  const [clickCounter, setClickCounter] = useState(0);
  const [screenText, setScreenText] = useState(clickCounter === 0 ? "0" : "0");
  const [err, setErr] = useState(false);
  const [isFullScreen,setIsFullScreen] = useState(false);

  const operatorOnClick = (operator) => {
    if (screenText.length === 13) {
      toast.error("Screen is full!" , {autoClose : 2500});
      setIsFullScreen(true);
      setTimeout(() => {
      setIsFullScreen(false);
      }, 3000);
    } else {
      if (clickCounter !== 0) {
        setScreenText((prev) => (prev === operator ? prev : prev + operator));
        setClickCounter((prev) => prev + 1);
      }
    }
  };

  const mainOperatorOnClick = (operator) => {
    if (screenText.length === 13) {
      toast.error("Screen is full!"  , {autoClose : 2500});
      setIsFullScreen(true);
      setTimeout(() => {
        setIsFullScreen(false);
        }, 3000);
    } else {
      if (clickCounter === 0) {
        setScreenText((prev) => operator);
        setClickCounter((prev) => prev + 1);
      } else {
        setScreenText((prev) => prev + operator);
        setClickCounter((prev) => prev + 1);
      }
    }
  };

  const oprandOnClick = () => {
    if (screenText.length === 13) {
      toast.error("Screen is full!" , {autoClose : 2500});
      setIsFullScreen(true);
      setTimeout(() => {
        setIsFullScreen(false);
        }, 3000);
    } else {
      if (clickCounter === 0) {
        setScreenText((prev) => "0");
        setClickCounter(0);
      } else {
        setScreenText((prev) => Math.pow(prev, 2).toString());
        setClickCounter(Math.pow(screenText, 2).toString().length);
      }
    }
  };

  const resultOnClick = () => {
    handleResult(screenText);
    screenText === "0"
      ? setClickCounter(0)
      : setClickCounter(screenText.length);
  };

  const clearOnClick = () => {
    setScreenText((prev) => "0");
    setClickCounter(0);
  };

  const backOnClick = () => {
    if (screenText === "Invalid Input") {
      setScreenText("0");
    } else if (clickCounter === 0) {
      setScreenText((prev) => "0");
      setClickCounter(0);
    } else if (!(clickCounter === 1)) {
      setScreenText((prev) => prev.slice(0, prev.length - 1));
      setClickCounter((prev) => prev - 1);
    } else {
      setScreenText((prev) => "0");
      setClickCounter(0);
    }
  };

  const handleResult = (inputEquationStr) => {
    let result = "";
    try {
      result = eval(inputEquationStr);
      setScreenText(result.toString());
    } catch (error) {
      if (inputEquationStr === "0") {
        setScreenText("0");
      } else {
        toast.error(error.message, {
          autoClose: 2000,
        });
        setScreenText("Invalid Input");
        setErr(true);
        setTimeout(() => {
          setScreenText("0");
          setErr(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    setClickCounter(0);
  }, [err]);

  return (
    <>
      <ToastContainer />
      <div className="calculator">
        <div className="container d-flex justify-content-center">
          <div className="cal-body rounded shadow p-3">
            <Screen screenText={screenText} isError={err} />
            <div className="cal-inner-body  d-flex flex-wrap mt-4 p-3">
              <Button  isFullScreen={isFullScreen} btnTxt={"%"} clickFunc={() => operatorOnClick("%")} />
              <Button isFullScreen={isFullScreen}
                btnTxt={"x"}
                clickFunc={() => oprandOnClick()}
                sqr={true}
              />
              <Button isFullScreen={isFullScreen} btnTxt={"="} clickFunc={() => resultOnClick()} />
              <Button isFullScreen={isFullScreen} btnTxt={"C"} clickFunc={() => clearOnClick()} />
              <Button isFullScreen={isFullScreen}
                btnTxt={<i className="bi bi-backspace-fill"></i>}
                clickFunc={() => backOnClick()}
              />
              <Button isFullScreen={isFullScreen} btnTxt={"7"} clickFunc={() => mainOperatorOnClick("7")} />
              <Button isFullScreen={isFullScreen} btnTxt={"8"} clickFunc={() => mainOperatorOnClick("8")} />
              <Button isFullScreen={isFullScreen} btnTxt={"9"} clickFunc={() => mainOperatorOnClick("9")} />
              <Button isFullScreen={isFullScreen} btnTxt={"+"} clickFunc={() => operatorOnClick("+")} />
              <Button isFullScreen={isFullScreen} btnTxt={"-"} clickFunc={() => operatorOnClick("-")} />
              <Button isFullScreen={isFullScreen} btnTxt={"4"} clickFunc={() => mainOperatorOnClick("4")} />
              <Button isFullScreen={isFullScreen} btnTxt={"5"} clickFunc={() => mainOperatorOnClick("5")} />
              <Button isFullScreen={isFullScreen} btnTxt={"6"} clickFunc={() => mainOperatorOnClick("6")} />
              <Button isFullScreen={isFullScreen} btnTxt={"*"} clickFunc={() => operatorOnClick("*")} />
              <Button isFullScreen={isFullScreen} btnTxt={"/"} clickFunc={() => operatorOnClick("/")} />
              <Button isFullScreen={isFullScreen} btnTxt={"3"} clickFunc={() => mainOperatorOnClick("3")} />
              <Button isFullScreen={isFullScreen} btnTxt={"2"} clickFunc={() => mainOperatorOnClick("2")} />
              <Button isFullScreen={isFullScreen} btnTxt={"1"} clickFunc={() => mainOperatorOnClick("1")} />
              <Button isFullScreen={isFullScreen} btnTxt={"."} clickFunc={() => operatorOnClick(".")} />
              <Button isFullScreen={isFullScreen} btnTxt={"0"} clickFunc={() => operatorOnClick("0")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
