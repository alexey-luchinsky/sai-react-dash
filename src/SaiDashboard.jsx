import React from 'react'
import GridLayout from 'react-grid-layout';
import SaiDash from './SaiDash';

export default class SaiDashboard extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: "0", x: 5, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: "1", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: "2", x: 2, y: 0, w: 1, h: 2}
    ];
    // let dash = <SaiDash id="b"/>;
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="0"><SaiDash id="second" type="image" data={{img_path:"./bgsu.png"}}/></div>
        <div key="1"><SaiDash id="second" type="text" data={{text:"I am a simple dash"}}/></div>
        <div key="2">c</div>
      </GridLayout>
    );
  }
}
