import { Bar } from "react-chartjs-2";
import {Chart as Chartjs} from 'chart.js/auto'

const BarChart=({chartData})=>{
    return <Bar data={chartData}/>;
}

export default BarChart;