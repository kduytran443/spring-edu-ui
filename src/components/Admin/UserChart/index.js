import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { Chart } from 'react-chartjs-2';

import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import { classService } from '~/services/classService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function UserChart() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const location = useLocation();
    const [chartData, setChartData] = useState({
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Lớp học',
                data: [],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });

    useEffect(() => {
        classService.getClassChart().then((data) => {
            if (data.length > 0) {
                const obj = { ...chartData };
                obj.datasets = [
                    {
                        label: 'Lớp học',
                        data: data,
                        fill: true,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ];
                setChartData(obj);
            }
        });
    }, [location]);

    return (
        <div className="w-full">
            <div className="md:w-50% w-full">
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default UserChart;
