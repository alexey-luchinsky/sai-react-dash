import './css/App.css';
import SaiDashboard from "./SaiDashboard"
import "./css/react-grid-layout_styles.css"
import SaiDash from './SaiDash';

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
