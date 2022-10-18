import React, { useEffect,useState } from 'react';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

const Employees = () => {
  const toolbarOptions = ['Delete'];
  const pageSettings = { pageSize: 6 };
  
  const [data, setData] = React.useState([]);
  console.log(data)
  const editing = { allowDeleting: true, allowEditing: true };
  const getPatientData = async () => {
    const res = await fetch("http://localhost:5000/getpatient");
    const data = await res.json();
    // console.log(data)
    setData(data);
  };
  useEffect(() => {
    getPatientData();
        // 4. Setting *dogImage* to the image url that we received from the response above

  },[])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Patient Details" />
      <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings} toolbar={toolbarOptions}>
    {/* <ColumnsDirective>
        <ColumnDirective field='PatientId' width='100' textAlign="Right"/>
        <ColumnDirective field='PatientName' width='100'/>
        <ColumnDirective field='DOB' width='100' textAlign="Right"/>
        <ColumnDirective field='ContactNumber' width='100' format="C2" textAlign="Right"/>
        
    </ColumnsDirective> */}
    <Inject services={[Page, Sort, Filter, Group]}/>
</GridComponent>;
      {/* <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      > */}
        {/* <ColumnsDirective> */}
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {/* {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent> */}
    </div>
  );
};
export default Employees;
