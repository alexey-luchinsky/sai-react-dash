import React from 'react'
import GridLayout from 'react-grid-layout';
import SaiDash from './SaiDash.js';
import AddDashForm from './AddDashForm.js';

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
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  addElement(event, form_state) {
    console.log("Adding text element ");
    console.log("event=", event);
    console.log("form_state=", form_state);
    let layout = this.state.layout;
    let elements = this.state.elements;
    let maxInd=0;
    if( elements.length>0) {
      maxInd = Math.max(...layout.map( (el) => parseInt(el.i)))+1;
    };
    console.log("maxInd=", maxInd);
    if(event.target.name === "add_text") {
      console.log("Adding text ", form_state.text_text);
      layout = layout.concat({i:maxInd.toString(), x:0, y:0, w:3, h:1});
      elements = elements.concat({type:"text", data:{text:form_state.text_text}});
      this.setState({layout: layout, elements:elements}); 
    } else if(event.target.name === "add_image") {
      console.log("Adding image ", form_state.image_path);
      layout = layout.concat({i:maxInd.toString(), x:0, y:0, w:3, h:3});
      elements = elements.concat({type:"image", data:{img_path:form_state.image_path}});
      this.setState({layout: layout, elements:elements}); 
    }
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

  handleLayoutChange(layout) {
    this.setState({
      layout:layout,
      elements: this.state.elements
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
      <div>
      <AddDashForm
        handleAddElement = {this.addElement}/>
      <GridLayout 
        className="layout" 
        layout={this.state.layout} 
        cols={12} 
        rowHeight={30} 
        width={1200}
        onLayoutChange={this.handleLayoutChange}>
        {this.get_elements()}
      </GridLayout>
      </div>
    );
  }
}
