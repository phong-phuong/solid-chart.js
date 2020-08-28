import { Chart } from "chart.js";
import { createDependentEffect } from "solid-js";
import { ComponentProps } from "./helpers";
type ChartJsArgs = ConstructorParameters<typeof Chart>;
export type SolidChartProps = {
  options?: ChartJsArgs[1];
  canvasOptions?: ComponentProps<"canvas">;
};
let chart: Chart;
export function SolidChart(props: SolidChartProps) {
  createDependentEffect(() => {
    chart?.update();
  }, [() => props]);
  function createChart(canvas: HTMLCanvasElement) {
    setTimeout(() => {
      chart = new Chart(canvas, { ...props.options });
    });
  }
  return <canvas {...props.canvasOptions} ref={createChart} />;
}
