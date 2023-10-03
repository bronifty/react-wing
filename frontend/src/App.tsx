import React from "react";
import "./App.css";
import Order from "./components/order/Order";
import Upload from "./components/upload/Upload";
import Download from "./components/download/Download";

function App() {
  const [count, setCount] = React.useState(0);
  const [apiUrl, setApiUrl] = React.useState("http://localhost:3000");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/config.json");
        const data = await response.json();
        if (data) {
          setApiUrl(data.api);
        } else {
          setApiUrl("http://localhost:3000");
        }
      } catch (error) {
        console.error(error);
        setApiUrl("http://localhost:3000");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <div>{apiUrl && JSON.stringify(apiUrl, null, 2)}</div>
      <Order apiUrl={apiUrl} />
      <Upload apiUrl={apiUrl} />
      <Download apiUrl={apiUrl} />
    </>
  );
}

export default App;
