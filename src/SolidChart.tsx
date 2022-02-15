import { Chart, registerables } from 'chart.js';
//import merge from "lodash.merge";
import { ComponentProps, createEffect, createSignal } from "solid-js";
export type SolidChartProps = {
    canvasOptions?: ComponentProps<"canvas">;
} & Chart.ChartConfiguration;

Chart.register(...registerables);

const deepClone = (config: SolidChartProps): SolidChartProps =>
    JSON.parse(JSON.stringify(config));

const replaceChartProps  = (props: {src:SolidChartProps, dest:Chart})=> {
    const { src, dest } = props;
    for(const key in src) {
        if(key in dest) {
            dest[key] = src[key];
        }
    }
}

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

        /* I removed the following line and replaced it because
         * it was causing a bug where the chart was not updating correctly due to merge
         * there are instances where we want to remove properties or data from the chart,
         * rather than merge them 
         * However, it may be better to just create a new chart instance, but it defeats the
         * purpose of reactivity.
         */

        //merge(_chart.config, deepClone(props));
        replaceChartProps({src: props, dest: _chart.config});
        
        console.log("updating chart");
        _chart.update();
    });
    function createChart(canvas: HTMLCanvasElement) {
        setTimeout(() => setCanvas(canvas));
    }
    return <canvas {...props.canvasOptions} ref={createChart} />;
}