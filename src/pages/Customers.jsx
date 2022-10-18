import React,{useState,useEffect} from 'react';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { Line } from 'react-chartjs-2';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import jsPDF from 'jspdf'
import "jspdf-autotable";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))
const Customers = () => {
  const [age, setAge] = React.useState('');
  const [conditionss, setconditionss] = React.useState('');
  const [medicine, setMedicine] = React.useState('');
  const [ans, setAns] = React.useState([]);
  const[selected,setselected]=React.useState('');
  // console.log(ans)
  const [datas, setDatas] = React.useState([]);
  const [conditions,setConditions ]=React.useState([]);
  const [emaildata, setemaildata] = React.useState([]);
  const [patientdatas, setPatientdata] = React.useState([]);
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
    console.log(data)

  const [selectdrug,setdrug ]=React.useState([]);
  const [selectscore,setscore ]=React.useState([]);
  // console.log(data)
  
  const getPatientData = async () => {
    const res = await fetch("http://localhost:5000/getpatient");
    const data = await res.json();
    // console.log(data)
    setDatas(data);
  };
  
  useEffect(() => {
    getPatientData();
    getAnswer();
        // 4. Setting *dogImage* to the image url that we received from the response above

  },[])
  const handleChange = async (event ) => {
    const res = await fetch(`http://localhost:5000/getpatientbyid?id=${event.target.value}`);
    const patientdata = await res.json();
    setAge(event.target.value);
    
    setPatientdata(patientdata)
    
    
  };
  const handleChangeondition = async (event ) => {
    // const res = await fetch(`http://localhost:5000/getpatientbyid?id=${event.target.value}`);
    // const patientdata = await res.json();
    handleChange();
    setconditionss(event.target.value);
    
    // setPatientdata(patientdata)
    
    
  };
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), Medicine: '', Strength: '',Morning:'',Noon:'',Night:'',BF:'',AF:'',Quantity:'' },
  ]);
  console.log(inputFields)
  const appending=()=>{
    let toBeAdded = {inputFields}
    const r = patientdatas.map((object) => {
      return {...object, ...toBeAdded}
    })
    
    return r
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // let r=Object.entries(patientdatas).map(people => {
    //   people[1] = {inputFields}
    //   return people;
    // })
    
   
   let r=appending();
    setemaildata(r)
    pdfGenerate(r);
    console.log(r)

  
  };
  const getAnswer = async () => {
    const res = await fetch("http://localhost:5000/condition");
    const data = await res.json();
    // console.log(data)
    setAns(data);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
    setMedicine(event.target.value)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  Medicine: '', Strength: '',Morning:'',Noon:'',Night:'',BF:'',AF:'',Quantity:'' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  const getcondition = async (event) => {
    // console.log(event.target.value)
    setconditionss(event.target.value);
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
  setdrug(labelSet)
      setscore(dataSet1)
      setConditions(data);
      setselected(event.target.value)
      // console.log(dataSet1)
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
  // console.log(labelSet)
}
  const pdfGenerate=(props)=>{
    const today = new Date();
    const dd=String(today.getDate());
    const mm=String(today.getMonth());
    const yyyy=String(today.getFullYear());
    const date=dd+'/'+mm+'/'+yyyy
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 200;
    var doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const name = props.map(elt=>elt.patient_name);
    const title = "DMS Medical Assistance"
    const headers = [["ID", "NAME","Contact","DOB","Medicine","Strength","Morning","Noon","Night","BF","AF","Quantity"]];
    console.log(props)
    console.log(inputFields.length)
    const data = props.map(elt=>  [elt.id, elt.patient_name,elt.contact_no,elt.dob,elt.inputFields.map(res=>[res.Medicine]),elt.inputFields.map(res=>[res.Strength]),elt.inputFields.map(res=>[res.Morning]),elt.inputFields.map(res=>[res.Noon]),elt.inputFields.map(res=>[res.Night]),elt.inputFields.map(res=>[res.BF]),elt.inputFields.map(res=>[res.AF]),elt.inputFields.map(res=>[res.Quantity])]);

    let content = {
      startY: 120,
      head: headers,
      body: data,
      theme:'grid'
    };

    doc.text(title, marginLeft, 40);
    // doc.newLine();
    doc.text(`\nName:${name}\nDate:${date}`, 40, 60);
    // doc.text(``, 40, 40);
    
    doc.autoTable(content);

    //doc.addImage(logo, 'JPG', 65,21,500,400)

    //stringHtml = '<div style={{textAlign:\'center\'}}> Title of pdf </div>';
    //doc.fromHTML('<div style={{textAlign:\'center\'}}> Title of pdf </div>', 15, 20, {'width': 180});

    doc.save('Prescription.pdf')
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header  title="Prescription" />
      <FormControl style={{width:'20%'}}>
  <InputLabel id="demo-simple-select-label">Patient Id</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    {datas.length!=0 && datas.map(res=>(
    <MenuItem value={res.id}>{res.id}</MenuItem>
    )
    )
    }
  </Select>
</FormControl>

<div>
<br></br><br></br>
<GridComponent dataSource={patientdatas} ></GridComponent>
<br></br><br></br>
<Inject services={[Page, Sort, Filter, Group]}/>
<FormControl style={{width:'20%'}}>
  <InputLabel id="demo-simple-select-label">Condition</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={conditionss}
    label="Condition"
    onChange={(event)=>{getcondition(event)}}
  >
    {ans.length!=0 && ans.map(res=>(
    <MenuItem value={res.condition}>{res.condition}</MenuItem>
    )
    )
    }
  </Select>
</FormControl>
{/* <select onChange={(event)=>{getcondition(event)}} name="condition" id="condition" >
        {ans.length!=0 && ans.map(res=>
              
                   
                     
              <option>{res.condition}</option>
              
              
              
          )
          }
        </select> */}
        <br></br><br></br>
        <Line data={data} />
        <br></br><br></br>
        <GridComponent dataSource={conditions}/>
        <br></br><br></br>

</div>
   
      <Container>
      <h1>Add Prescription</h1>
      <br></br>
      <form className={classes.root} onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>

            {/* <select name="Medicine" label="Medicine" value={inputField.Medicine}
              onChange={event => handleChangeInput(inputField.id, event)}>
                {selectdrug.map(re=>
                <option >{re}</option>)}
                </select> */}
            {/* <TextField
              name="Medicine"
              label="Medicine"
              variant="filled"
              value={inputField.Medicine}
              onChange={event => handleChangeInput(inputField.id, event)}
            /> */}
             <FormControl style={{width:'87%'}}>
  <InputLabel id="demo-simple-select-label">Medicine</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    name="Medicine"
    value={inputField.Medicine}
    label="Medicine"
    onChange={event => handleChangeInput(inputField.id, event)}
  >
    {selectdrug.length!=0 && selectdrug.map(res=>(
    <MenuItem value={res}>{res}</MenuItem>
    )
    )
    }
  </Select>
</FormControl>
            <TextField
              name="Strength"
              label="Strength"
              variant="filled"
              value={inputField.Strength}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
             {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputField.Morning}
                label="Age"
                onChange={handleChange}
              >
              <MenuItem value='Yes'>Yes</MenuItem>
              <MenuItem value='No'>No</MenuItem>
              
            </Select> */}
            <TextField
              name="Morning"
              label="Morning"
              variant="filled"
              value={inputField.Morning}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="Noon"
              label="Noon"
              variant="filled"
              value={inputField.Noon}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
          
            <TextField
              name="Night"
              label="Night"
              variant="filled"
              value={inputField.Night}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="BF"
              label="BF"
              variant="filled"
              value={inputField.BF}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="AF"
              label="AF"
              variant="filled"
              value={inputField.AF}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="Quantity"
              label="Quantity"
              variant="filled"
              value={inputField.Quantity}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          
          onClick={handleSubmit}
        >Download</Button>
      </form>
    
    </Container>
      

  
    </div>
  );
};

export default Customers;
