import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
    <App
        width={16}
        height={12}
        mineCount={30}
    />,
    document.getElementById("root")
);
