Chart.JS powered by solid-js framework

### Installation

`npm i chart.js solid-js solid-chartjs`

### Example

```tsx
import { afterEffects, createState } from "solid-js";
import SolidChart, { SolidChartProps } from "../index";
const edges = 6;
const labels = ["Solid", "Is", "Most", "Performant", "JavaScript", "Framework"];
const datasets = new Array<number[]>(edges).fill([]).map((_, i) => {
  const arr = [0, 0, 0, 0, 0, 0];
  if (i === edges - 1) {
    arr[i] = 60;
    arr[0] = 60;
  } else {
    arr[i] = 60;
    arr[i + 1] = 60;
  }
  return {
    backgroundColor: i % 2 === 0 ? "#3164A3" : "white",
    data: arr,
    label: labels[i],
  };
});
export default function Stats() {
  const settings: SolidChartProps = {
    type: "radar",
    data: {
      labels,
      datasets,
    },
    options: {
      title: {
        display: true,
        text: "SOLID GRAPH",
      },
      scale: {
        ticks: {
          maxTicksLimit: edges,
        },
      },
    },
  };
  const [chart, setChart] = createState(settings);
  afterEffects(() => {
    setInterval(() => {
      labels.push(labels.shift());

      setChart("data", "labels", [...labels]);

      datasets.push(datasets.shift());
    }, 1500);
  });
  return (
    <SolidChart
      {...chart}
      canvasOptions={{
        width: 1000,
        height: 1000,
      }}
    />
  );
}
```

![alt](https://i.imgur.com/7XX9dBf.gif)
