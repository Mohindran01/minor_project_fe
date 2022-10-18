

import {useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)
  
export default function Lines(props) {
    // console.log(props.drug)
    // console.log(props.score)
    const [data, setData] = useState({
      labels:[],
      datasets:[
        {
          label:"First Dataset",
          data:[],
          backgroundColor:'yellow',
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
    useEffect(()=> {
    
          
      
        }
    )
      const res=()=>{
        setData({
          labels:props.drug,
          datasets:[
            {
              label:"First Dataset",
              data:props.score,
              backgroundColor:'yellow',
              borderColor:'green',
              tension:0.4,
              fill:true,
              pointStyle:'rect',
              pointBorderColor:'blue',
              pointBackgroundColor:'#fff',
              showLine:true
            }
          ]
          })
      }

    
   
  return (
    <div style={{width:'800px', height:'800px'}}>
            {/* {
                console.log("dataaaaaaaa", data)
            } */}
            
            <Line data={data} />
         </div>
  )
}
