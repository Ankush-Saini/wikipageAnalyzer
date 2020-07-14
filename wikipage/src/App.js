import React from 'react';
import './App.css';
import Menu from './Menu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Task1 from './tasks/Task1'
import Task2 from './tasks/Task2'
function App() {
  let links=[
      {label:'Home', link: '/'},
      {label:'Task 1', link: '/task1'},
      {label:'Task 2', link: '/task2'}
  ];
  return (
    <div className="App">
      <header className="App-header">
        WikiPages Analyzer
      </header>

      <Router>
        <Menu links={links}/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/task1" component={Task1}/>
        <Route path="/task2" component={Task2}/>
        </Switch>
      </Router>
      <body>
        <div id="root" border="1">  </div>

      </body>
    </div>
  );
}

const Home = () => (
  <div>
     <h1>Welcome to WikiPages Analyzer</h1> 
  </div>
);

{/* <Route
    path='/other'
    name='Another page'
    render={()=><div>My Second Route</div>}
/> */}

// ReactDOM.render(<Task />,document.getElementById("root"));
export default App;
