import Dashboard from "./Dashboard";
import Login from "./Login";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Dashboard/>}/>

          
           

          </Routes>
        </div>
      </div>
    </Router>
//     <div>
// <Dashboard />
//     </div>
   
  );
}

export default App;
