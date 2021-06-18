import React from 'react'
import GridLayout from 'react-grid-layout';
import SaiDash from './SaiDash.js';

export default class SaiDashboard extends React.Component {
  state = {
    layout:[
    {i: "0", x: 5, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: "1", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: "2", x: 2, y: 0, w: 5, h: 2}
    ],
    elements:[
      {type:"image", data:{img_path:"./bgsu.png"}},
      {type:"text", data:{text:"I am a simple dash"}},
      {type:"aaa", data:"aaa"}
    ]
  };

  constructor(porps) {
    super(porps);
    this.removeElement = this.removeElement.bind(this);
  }

  removeElement(index) {
    console.log("Removing element #", index);
    const layout = this.state.layout;
    const elements = this.state.elements;
    this.setState({
        layout: layout.filter( (el, i) => {
                return i !== index
            }),
        elements: elements.filter( (el, i) => {
                return i !== index
            }),
    });
  }


  get_elements = () => {
    const layout = this.state.layout;
    const elements = this.state.elements;
    return(
      elements.map( (el, index) => {
        return(
        <div key={layout[index].i}>
          <SaiDash type={el.type} data={el.data} index={index} removeElement={this.removeElement}/>
        </div>
        );
      })
    )
  }

  render() {

    return (
      <GridLayout className="layout" layout={this.state.layout} cols={12} rowHeight={30} width={1200}>
        {this.get_elements()}
      </GridLayout>
    );
  }
}
