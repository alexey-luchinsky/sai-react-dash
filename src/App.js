import './css/App.css';
import SaiDashboard from "./SaiDashboard.js"
import "./css/react-grid-layout_styles.css"
import {SaiDash, resize_plotly} from './SaiDash.js';

function App() {
  return (
    <div className="App">
      <h1>Alone</h1>
      <SaiDash id="first"/>
      <h1> SAI Dashboard</h1>
      <SaiDashboard/>
    </div>
  );
}

export default App;
