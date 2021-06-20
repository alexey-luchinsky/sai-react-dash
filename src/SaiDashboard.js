import React from 'react'
import {SaiDash, resize_plotly} from './SaiDash.js';
import AddDashForm from './AddDashForm.js';
import EditForm from './EditForm.js';

import CSV from "jquery-csv";


import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

export default class SaiDashboard extends React.Component {
  state = {
    layout:[
    {i: "0", x: 5, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: "1", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: "2", x: 2, y: 0, w: 3, h: 7}
    ],
    elements:[
      {type:"image", data:"./bgsu.png"},
      {type:"text", data:"I am a simple dash"},
      {type:"plotly", data:[
        {x:[1,2,3], y:[2,2,1], type:"scatter"},
        {x:[1,2,3], y:[2,1,2], type:"scatter"}
      ]}
    ],
    showEditForm:false,
    currentIndex:0,
    current_element: {type:"image", data:"./bgsu.png"}
  };

  openEditForm(index) {
    console.log("openEditForm");
    this.setState({
      currentIndex:index, 
      current_element: this.state.elements[index]})
    this.setState({showEditForm:true});
  }

  closeEditForm() {
    this.setState({showEditForm:false});
  }

  submitForm(i, dat) {
    console.log("EditForm submitted, i=", i," dat=", dat);
    let elems = this.state.elements;
    elems[i].data = dat;
    this.setState({elements:elems});
    this.closeEditForm();
  }

  constructor(porps) {
    super(porps);
    this.removeElement = this.removeElement.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.addElement = this.addElement.bind(this);
    this.resize_event = this.resize_event.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  loadPlotly(text, index) {
    var T = text.split("\n");
    T = T.map( L => L.split(" ").map( (E) => parseInt(E)));
    T = T.filter(L => L.length >1);
    var data_ = [{
      x: T.map( (a) => a[0]),
      y: T.map( (a) => a[1]),
      type:"scatter"
    }];
    var elements = this.state.elements;
    elements[index] = {type:"plotly", data:data_};
    this.setState({elements:elements});
    
    console.log("loadPlotly(",data_,",",index);
    
    //   .then( T => )
    //   .then( res => {
    //     console.log(res);
    //     result.out = res
    //   });
    //   // .then( R => console.log(R));
  }  

  // readCSV(file_name) {
  //   console.log( (await fetch('sample.txt')).text() );
  // }

  // Adding a new element (called from AddDashForm)
  async addElement(event, form_state) {
    console.log("addElement(",form_state);
    const type = event.target.name;
    // Adding new layout record
    let layout = this.state.layout;
    let maxInd=0;
    if( layout.length>0) {
      maxInd = Math.max(...layout.map( (el) => parseInt(el.i)))+1;
    };
    let data_ = "unknown";
    if(type==="text") {
      layout = layout.concat({i:maxInd.toString(), x:0, y:0, w:3, h:1});
      data_ = form_state.values[type];
    }
    else if(type==="image") {
      layout = layout.concat({i:maxInd.toString(), x:0, y:0, w:3, h:3});
      data_ = form_state.values[type];
    } else if(type === "plotly") {
      layout = layout.concat({i:maxInd.toString(), x:0, y:0, w:5, h:5});
      fetch(form_state.values[type])
        .then( r => r.text() )
        .then( t => this.loadPlotly(t, maxInd));
      data_ = [{x:[1,2,3,4,5,6], y:[1,2,3,3,2,1], type:"scatter"}];
    } else {
      console.log("Unknown element type ",type);
      return;
    };
    // adding new element record
    let elements = this.state.elements;
    elements = elements.concat({type:type, data:data_});
    // saving the state
    this.setState({layout: layout, elements:elements}); 
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
          <SaiDash type={el.type} data={el.data} index={index} 
          openEditForm={this.openEditForm}
          />
        </div>
        );
      })
    )
  }

  resize_event(layout, oldLayoutItem, layoutItem, placeholder) {
    console.log("onResize: layoutImem=",layoutItem.i);
    // console.log("Index:", layout.indexOf(layoutItem));
    var i=layout.indexOf(layoutItem);
    if( this.state.elements[i].type === "plotly") {
      console.log("Resizing Plotly #",i);
      resize_plotly("gs"+i);
      
    }
  }


  render() {

    return (
      <div>
      <AddDashForm
        handleAddElement = {this.addElement}/>
      <ReactGridLayout 
        className="layout" 
        layout={this.state.layout} 
        cols={12} 
        rowHeight={30} 
        width={1200}
        onResize={this.resize_event}
        onResizeStop={this.resize_event}
        onLayoutChange={this.handleLayoutChange}
        >
        {this.get_elements()}
      </ReactGridLayout>
      <EditForm 
        isOpen={this.state.showEditForm}
        index={this.state.currentIndex}
        removeElement = {this.removeElement}
        element = {this.state.current_element}
        closeEditForm={this.closeEditForm}
        submitForm={this.submitForm}/>
      </div>
    );
  }
}
