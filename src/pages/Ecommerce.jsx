import React, { useEffect,useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import 'chart.js/auto'
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit } from '@syncfusion/ej2-react-grids';
import { getList } from './list';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import Lines from './Lines'
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

const DropDown = ({ currentMode,data }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent  style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={data} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const [ans, setAns] = React.useState([]);
  const[selected,setselected]=React.useState('');
  const [conditions,setConditions ]=React.useState([]);
  const [selectdrug,setdrug ]=React.useState([]);
  const [selectscore,setscore ]=React.useState([]);
  console.log(selectdrug)
  console.log(selectscore)
  const [data, setData] = useState({
    labels:[],
    datasets:[
      {
        label:"Mean Normalized Score",
        data:[],
        backgroundColor:'#efefef',
        borderColor:'green',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ],
    });
    // const res=()=>{
    //   setData({
    //     labels:props.drug,
    //     datasets:[
    //       {
    //         label:"Mean Normalized Score",
    //         data:props.score,
    //         backgroundColor:'red',
    //         borderColor:'green',
    //         tension:0.4,
    //         fill:true,
    //         pointStyle:'rect',
    //         pointBorderColor:'blue',
    //         pointBackgroundColor:'#fff',
    //         showLine:true
    //       }
    //     ]
    //     })
    // }
  console.log(ans)
  const { currentColor, currentMode } = useStateContext();
  
  console.log(conditions)
  const getcondition = async (event) => {
    // console.log(event.target.value)
    const labelSet = []
           const dataSet1 = [];
           const dataSet2 = [];
    const res = await fetch(`http://localhost:5000/drug?condition=${event.target.value}`);
    const data = await res.json();
    for (const val of data) {
      // dataSet1.push(val.drug_name);
      dataSet1.push(val.meannormalizedscore)
      labelSet.push(val.drug_name)
      

  }
    // console.log(data)
    setdrug(labelSet)
    setscore(dataSet1)
    setConditions(data);
    setselected(event.target.value)
    console.log(dataSet1)
    setData({
      labels:labelSet,
      datasets:[
        {
          label:"Mean Normalized Score",
          data:dataSet1,
          backgroundColor:'#cafceb',
          borderColor:'#5bff03',
          tension:0.4,
          fill:true,
          pointStyle:'rect',
          pointBorderColor:'blue',
          pointBackgroundColor:'#fff',
          showLine:true
        }
      ]
      })
    // setData({
    //   labels:labelSet,
    //   datasets: [
    //     {
    //       label: 'Dataset ID',
    //       data:dataSet1,
    //       borderColor: 'rgb(255, 99, 132)',
    //       backgroundColor: 'rgba(99, 132, 0.5)',
    //     },
    //     {
    //       label: 'Dataset ID2',
    //       data:dataSet2,
    //       borderColor: 'rgb(53, 162, 235)',
    //       backgroundColor: 'rgba(53, 235, 0.5)',
    //     },
    //   ],
    // })
    // setData(data);
  };
  const getAnswer = async () => {
    const res = await fetch("http://localhost:5000/condition");
    const data = await res.json();
    // console.log(data)
    setAns(data);
  };
  // console.log(dropdownData.result)
  useEffect(()=>{
    getAnswer();
    
    
    // console.log(result.condition)
    // const [item]=result.condition;
    // console.log(item)
   

  },[]);
  // var data = {
  //   labels: chart?.map(x => x.drug_name),
  //   datasets: [{
  //     label: `Coins Available`,
  //     data: chart?.map(x=>x.meannormalizedscore),
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(255, 206, 86, 0.2)',
  //       'rgba(75, 192, 192, 0.2)',
  //       'rgba(153, 102, 255, 0.2)',
  //       'rgba(255, 159, 64, 0.2)'
  //     ],
  //     borderColor: [
  //       'rgba(255, 99, 132, 1)',
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(255, 206, 86, 1)',
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 1)',
  //       'rgba(255, 159, 64, 1)'
  //     ],
  //     borderWidth: 1
  //   }]
  // };
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
        {/* <DropDown currentMode={currentMode} data={ans}/> */}
        <select onChange={(event)=>{getcondition(event)}} name="condition" id="condition" >
        {ans.length!=0 && ans.map(res=>
              
                   
                     
              <option>{res.condition}</option>
              
              
              
          )
          }
        </select>

        <GridComponent dataSource={conditions}/>
        </div>
     
      </div>
          
   
      
      <div className="flex gap-10 m-4 flex-wrap justify-center">
       
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Condition Vs Mean Normalized Score</p>
            {/* <DropDown currentMode={currentMode} /> */}
          </div>
          <div className="md:w-full overflow-auto">
          {/* <Line
        data={data}
        height={400}
        options={options}

      /> */}
          {/* <Lines drug={selectdrug} score={selectscore}/> */}
          <Line data={data} />
            {/* <LineChart /> */}
          </div>

        </div>
      </div>

      
    </div>
  );
};

export default Ecommerce;
