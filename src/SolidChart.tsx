import { Chart } from "chart.js";
import { Component, createEffect, createSignal } from "solid-js";
import merge from "lodash.merge";
export type SolidChartProps = {
  canvasOptions?: ComponentProps<"canvas">;
} & Chart.ChartConfiguration;
export type ComponentProps<
  T extends keyof JSX.IntrinsicElements | Component<any>
> = T extends Component<infer P>
  ? P
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : {};

let chart: Chart;
const deepClone = (config: SolidChartProps): SolidChartProps =>
  JSON.parse(JSON.stringify(config));

export function SolidChart(props: SolidChartProps) {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>(null);
  createEffect(() => {
    const el = canvas();
    if (!el) return;
    if (!chart) {
      chart = new Chart(el, deepClone(props));
      return;
    }
    merge(chart.config, deepClone(props));
    console.log("updating chart");
    chart.update();
  });
  function createChart(canvas: HTMLCanvasElement) {
    setTimeout(() => setCanvas(canvas));
  }
  return <canvas {...props.canvasOptions} ref={createChart} />;
}
