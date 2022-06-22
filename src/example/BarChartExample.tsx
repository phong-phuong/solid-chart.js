
import { createEffect, createSignal } from "solid-js";
import SolidChart from "../";

const dataset1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: 'Fully Rounded',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'black',
            backgroundColor: 'rgba(255, 80, 80, 0.9)',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
        },
        {
            label: 'Small Radius',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: 'black',
            backgroundColor: 'blue',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
        }
    ]
};

const dataset2 = {
    labels: ["January", "February", "March"],
    datasets: [
        {
            label: 'Fully Rounded',
            data: [23, 45, 67],
            borderColor: 'black',
            backgroundColor: 'red',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
        },
        {
            label: 'Small Radius',
            data: [12, 34, 56],
            borderColor: 'black',
            backgroundColor: 'blue',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
        }
    ]
};

export default () => {
    const createConfig = (data) => {
        return {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: `Dataset with ${data.labels.length} items`,
                    }
                }
            },
            replace: true
        };
    };

    const [dataset, setDataset] = createSignal(dataset1);
    const [chart, setChart] = createSignal(createConfig(dataset()));

    const updateChart = (data) => {
        setChart(createConfig(data));
    } 

    const toggleDataset = () => {
        dataset() == dataset1 ? setDataset(dataset2) : setDataset(dataset1);
    };

    createEffect(()=> {
        updateChart(dataset());
    });

    return (
        <>
            <button onClick={toggleDataset}>Toggle Between Datasets</button>
            <SolidChart
                {...chart}
                canvasOptions={{
                    width: 400,
                    height: 300,
                }}
            />
        </>
    );
}
