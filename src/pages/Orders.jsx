import React,{useState,useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import {  Group } from '@syncfusion/ej2-react-grids';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

import { useStateContext } from '../contexts/ContextProvider';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))
const Orders = () => {
  const { currentColor } = useStateContext();
  const classes = useStyles()
  // const [emailid, setemailid] = React.useState([]);
  const [filename, setfilename] = React.useState('');
  const [age, setAge] = React.useState('');
  const [emailid, setemail] = React.useState('');
 
  const [emaildata, setemaildata] = React.useState([]);
  const [patientdatas, setPatientdata] = React.useState([]);
  const toolbarOptions = ['Delete'];
  const pageSettings = { pageSize: 6 };
  
  const [data, setData] = React.useState([]);
  console.log(filename)
  const [inputFields, setInputFields] = useState([
    { id:uuidv4(),emailid: ''},
  ]);
  console.log(inputFields)
  const editing = { allowDeleting: true, allowEditing: true };
  const FileUploader = async (e) => {
    console.log(e.target.files[0].name)
    // const fileDrop = (files) => {
      const formData = new FormData();
  
      const file = e.target.files[0];
      setfilename(file.name)
      formData.append("file", file);
  
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      }).then((res) => {
        console.log(res.text);
      });
    };
    // const toaddress=(event)=>{
    //   setemailid(event.target.value)
    // }
    const handleChangeInput = (id, event) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
        }
        return i;
      })
      
      setInputFields(newInputFields);
    }
    const sendemail=async ()=>{
      
      
      console.log(emailid)
      const res = await fetch(`http://localhost:5000/sendemail?emailid=${emailid}&filename=${filename}`);
      const data = await res.json();
      console.log(data)
      alert("EMAIL SENT")


    }
    const getPatientData = async () => {
      const res = await fetch("http://localhost:5000/getpatient");
      const data = await res.json();
      // console.log(data)
      setData(data);
    };
    const getemail = async () => {
      const res = await fetch("http://localhost:5000/getpatient");
      const data = await res.json();
      // console.log(data)
      setemaildata(data);
      
    };
    useEffect(() => {
      
      getemail();
      getPatientData();
          // 4. Setting *dogImage* to the image url that we received from the response above
  
    },[])
    const getcondition = async (event) => {
      setemail(event.target.value)
      // console.log(event.target.value)
      // const labelSet = []
      //        const dataSet1 = [];
      //        const dataSet2 = [];
      const res = await fetch(`http://localhost:5000/getpatientbyemail?emailid=${event.target.value}`);
      const data = await res.json();
      console.log(data)
      // for (const val of data) {
      //   // dataSet1.push(val.drug_name);
      //   dataSet1.push(val.meannormalizedscore)
      //   labelSet.push(val.drug_name)
        
  
    }
    const handleChange = async (event ) => {
      const res = await fetch(`http://localhost:5000/getpatientbyid?id=${event.target.value}`);
      const patientdata = await res.json();
      setAge(event.target.value);
      setPatientdata(patientdata)
      setemail(patientdata.map(res=>res.emailid))
      console.log(event.target.value)
      
      
    };
    
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Email" title="Send Email" />
      
      {/* {data.length!=0 && <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings} toolbar={toolbarOptions}></GridComponent>} */}
      {/* <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      > */}
      {/* <input className="e-input" type="text" placeholder="To" onChange={toaddress}/>
      
      <input className="e-input" type="file" placeholder="Choose File" onChange={FileUploader} />
      <Button
          color="white"
          bgColor={currentColor}
          text="SEND EMAIL"
          borderRadius="10px"
          onClick={sendemail}
          width="50%"
        /> */}
          <Container>
      
      <form className={classes.root} onSubmit={sendemail}>
        {/* { inputFields.map(inputField => (
          <div>
            <select value={inputField.emailid} onChange={event => handleChangeInput(inputField.id,event)}>{}</select>
            <input className="e-input" type="file" placeholder="Choose File" onChange={FileUploader} />
          </div>
          )) }
          // <div key={inputField.id} > */}
           <FormControl style={{width:'20%'}}>
  <InputLabel id="demo-simple-select-label">Patient Id</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    {data.length!=0 && data.map(res=>(
    <MenuItem value={res.id}>{res.id}</MenuItem>
    )
    )
    }
  </Select>
</FormControl>
<br></br><br></br>
<div>
<GridComponent dataSource={patientdatas} ></GridComponent>
<Inject services={[Page, Sort, Filter, Group]}/>
</div>
          {/* //   <TextField
          //     name="emailid"
          //     label="emailid"
          //     variant="filled"
          //     value={inputField.emailid}
          //     onChange={event => handleChangeInput(inputField.id,event)}
          //   />
          
          
          // </div> */}
          <br></br>
             <input className="e-input" type="file" placeholder="Choose File" onChange={FileUploader} />
             <br></br>
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          
          onClick={sendemail}
        >Send</Button>
      </form>
    
    </Container>
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      {/* </GridComponent> */}
    </div>
  );
};
export default Orders;
