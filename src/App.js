import './css/App.css';
import SAI_Dashboard from "./SAI_Dashboard"
import "./css/react-grid-layout_styles.css"
import SaiDash from './SaiDash';

function App() {
  return (
    <div className="App">
      <h1>Alone</h1>
      <SaiDash/>
      <h1> SAI Dashboard</h1>
      <SAI_Dashboard/>
    </div>
  );
}

export default App;
