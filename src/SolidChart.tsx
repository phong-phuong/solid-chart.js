import { Chart } from "chart.js";
import { ComponentProps, createEffect, createSignal } from "solid-js";
import merge from "lodash.merge";
export type SolidChartProps = {
  canvasOptions?: ComponentProps<"canvas">;
} & Chart.ChartConfiguration;

const deepClone = (config: SolidChartProps): SolidChartProps =>
  JSON.parse(JSON.stringify(config));

export function SolidChart(props: SolidChartProps) {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>(null);
  const [chart, setChart] = createSignal<Chart | null>(null);
  createEffect(() => {
    const el = canvas();
    if (!el) return;
    const _chart = chart();
    if (!_chart) {
      setChart(new Chart(el, deepClone(props)));
      return;
    }
    merge(_chart.config, deepClone(props));
    console.log("updating chart");
    _chart.update();
  });
  function createChart(canvas: HTMLCanvasElement) {
    setTimeout(() => setCanvas(canvas));
  }
  return <canvas {...props.canvasOptions} ref={createChart} />;
}
