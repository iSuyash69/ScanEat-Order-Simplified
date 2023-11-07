import { Doughnut } from "react-chartjs-2";
import {Chart as Chartjs} from "chart.js/auto";

const DoughnutChart=({chartData})=>{
    return <Doughnut data={chartData}/>
}

export default DoughnutChart;