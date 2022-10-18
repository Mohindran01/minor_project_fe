import React, { Component } from 'react'

// import './style.css'
const axios = require('axios');

const ss={
  width: '100%',
  height: '100%',
  color: 'white',
  textAlign:'center',
  lineHeight: '75px',
  fontSize: '35px',
  fontFamily: "Segoe UI",
  animationDirection: 'reverse',
  background: '#e5405e',
  background: 'linear-gradient(to right, #e5405e 0%,  #eff3f2 50%, #09a946 100%)'
}
  
const local="http://localhost:5000"
export default class Dashboard extends Component {
    constructor(props){
		super(props);
		this.state = {
				result:[],
        condition:"",
        conditions:[],
        meanscore:[]
		}
	}
  // initial(){
  //   this.fetching()
  // }
  
    async fetching(event){
        let response = await axios.get("http://localhost:5000/condition");
        console.log(response.data)
        // let responses=response.data
        // console.log(response.data)
        if(this.state.result.length==0){
        this.setState({result:response.data})
        }
      

    }
    async handleChange(event) {
      let e=event.target.value
      let host=`${local}/drug`
      // let conditions=this.state.condition
      this.setState({condition:event.target.value})
      console.log(this.state.condition)
      // 
      
      console.log(typeof(event.target.value))

      let response=await axios.get(`${host}?condition=${event.target.value}`)
     
      // if(this.state.conditions.length==0){
        this.setState({conditions:response.data,meanscore:[]})
        // if(this.state.conditions.length!=0){
        //  { this.state.conditions.map(r=>   
        //   console.log(r.meannormalizedscore)
        //     // this.setState({meanscore:r.meannormalizedscore})
        //     )
        //     // console.log(this.state.meanscore)
        //   }
        }
      
        
        // }

		
   componentDidMount(){
    // if(!localStorage.getItem('token')){
    //   window.open("/","_self")
    // }
    this.fetching()
		// this.fetching()
    // this.initial()
    
        
        
		
	}   
    
  render() {
    const{result,conditions,meanscore}=this.state;
    // console.log(this.state.result)
    
   
    


const {uniqueNames} = Array.from(new Set(this.state.meanscore));
console.log(uniqueNames)
//  console.log(result)
    // console.log(typeof(objectArray))
    return (
      <div>
        
           {/* <h1>{result}</h1> */}
           {/* {Object.values(result).map(res=>{
            console.log(typeof(res)) */}
            
                
                
                <div>
                   <center><h1>DRUG RECOMMENDATION SYSTEM</h1></center> 
                   
                    <select  onChange={(event)=>{this.handleChange(event)}} name="condition" id="condition" value={this.state.value}>
                    
                    {result.map(res=>
                 
                      
                        
                        <option>{res.condition}</option>
                        
                        
                        
                    )
                    }
                        </select>
                      {conditions!=''?
                        <h1>Top Drugs For the Disease</h1>:
                        <h1>Select the Conditions</h1>
                    }
                        {/* <div>
                          {conditions.map((rr)=>{
                            const score=rr.meannormalizedscore;
                            console.log(score)
                            return(
                              <strong style={{float:'left',margin: '15px 15px 15px 800px'}}></strong>
                     
                            )
                            
                          })} */}
                           {/* <div id="container"> */}
    
        {/* <div style={ss}></div> */}
        
        {/* <div class="child shrinker timelapse"></div> */}
{/* </div> */}
{/* </div> */}
                    
                       { conditions!=''?<table border={10}>
                          <tr>
                          <th>Drug Name</th>
                          <th>Mean Score</th>
                          </tr>
                          {conditions.map(rr =>
                       
                              <tr>
                                
                                  <td>
                                    {rr.drug_name}
                                  </td>
                                  <td style={{background:rr.meannormalizedscore>=6?"Green":"Red"}}>
                                    {rr.meannormalizedscore}
                                  </td>

                                

                              </tr>
                             
                              )}
                        </table>:
                        null
  }
 
            
            </div>
            
                
            
            
           {/* })} */}
   {/* {Object.entries(result).forEach(([key, value]) => {
        console.log(key); // 'one'
        console.log(value); // 1
        return(
        <h1>{value}</h1>
        )
      })
    } */}
           {/* {result.map(res=>{
            <div>
            <select></select>
            <li>{res}</li>
            </div>
           })} */}
            {/* <select onChange={(event) => this.fetching(event)}>
                <option  onClick={(event) => this.fetching(event)}>Select</option> */}
                {/* <option>Result</option>
                <option>Result1</option> */}
                
               
            {/* {result.map(({res})=>{
                {
                    if(result!=''){return(
                
            <div>
            <option >{res}</option>
                
            </div>
                    )} */}
                {/* }
  })
        } */}
            {/* </select>   */}
            
  
      </div>
    )


    }
    
}
