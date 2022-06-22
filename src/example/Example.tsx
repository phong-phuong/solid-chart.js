import { createSignal } from "solid-js";
import SolidChart, { SolidChartProps } from "../";
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
        text: "SOLID CHART",
      },
      scale: {
        ticks: {
          maxTicksLimit: edges,
        },
      },
    },
  };

  const [chart, setChart] = createSignal(settings);

  setInterval(() => {
    labels.push(labels.shift());
    datasets.push(datasets.shift());
    setChart({ data: { labels, datasets } });
  }, 1400);

  return (
    <>
      <SolidChart
        {...chart}
        canvasOptions={{
          width: 1000,
          height: 950,
        }}
      />
    </>
  );
}
