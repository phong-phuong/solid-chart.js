import { render } from "solid-js/web";
import BarChartExample from "./example/BarChartExample";
import Example from "./example/Example";

const Examples = () => {
    return <div>
        <Example />
        <BarChartExample />
    </div>
}

render(() => <Examples />, document.getElementById("root"));
