import React from 'react'
import {SaiDash, resize_plotly} from './SaiDash.js';
import AddDashForm from './AddDashForm.js';
import EditForm from './EditForm.js';
import InfoPanel from './InfoPanel.js';
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
      {type:"image", data:"./bgsu.png", i:"0"},
      {type:"text", data:"I am a simple dash", i:"1"},
      {type:"plotly", data:[
        {x:[1,2,3], y:[2,2,1], type:"scatter", mode:"markers"},
        {x:[1,2,3], y:[2,1,2], type:"scatter", mode:"lines"}
      ], i:"2"}
    ],
    showEditForm:false,
    currentI:"0",
    current_element: {type:"image", data:"./bgsu.png"},
    infoOpened:false
  };

  print_state() {
    console.log(this.state);
  }

  openEditForm(i) {
    console.log("openEditForm");
    const index = this.search_elements_index(i);
    this.setState({
      currentI:i, 
      current_element: this.state.elements[index]})
    this.setState({showEditForm:true});
  }

  // scans for layout state and returns the index of layout with given i property
  search_layout_index(i) {
    const layout = this.state.layout;
    const lay = layout.filter( (e) => e.i === i);
    if(lay)
      return layout.indexOf(lay[0]);
    else {
      console.log("failed to find layout with i=", i);
      return -1;
    }
  }

    // scans for elements state and returns the index of element with given i property
    search_elements_index(i) {
      console.log("i=",i, " i+1=", i+1)
      const elements = this.state.elements;
      const el = elements.filter( (e) => e.i === i);
      if(el.length) {
        console.log("Found element ", el);
        return elements.indexOf(el[0]);
      }
      else {
        console.log("failed to find layout with i=", i);
        return -1;
      }
    }
  
  closeEditForm() {
    this.setState({showEditForm:false});
  }

  submitForm(i, dat) {
    const index = this.search_elements_index(i);
    console.log("EditForm submitted, index=", index," dat=", dat);
    let elems = this.state.elements;
    elems[index].data = dat;
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
    this.print_state = this.print_state.bind(this);
  }

  loadPlotly(text, i, type, mode) {
    var T = text.split("\n");
    T = T.map( L => L.split(" ").map( (E) => parseInt(E)));
    T = T.filter(L => L.length >1);
    var data_ = [{
      x: T.map( (a) => a[0]),
      y: T.map( (a) => a[1]),
      type:type,
      mode:mode
    }];
    var elements = this.state.elements;
    var index = this.search_elements_index(i);
    elements[index] = {type:"plotly", data:data_, i:i};
    this.setState({elements:elements});
    console.log("added plotly", data_)
  }  

  // Adding a new element (called from AddDashForm)
  async addElement(event, form_state) {
    console.log("addElement(",form_state);
    const type = event.target.name;
    // Adding new layout record
    let layout = this.state.layout;
    let maxI=0;
    if( layout.length>0) {
      maxI = Math.max(...layout.map( (el) => parseInt(el.i)))+1;
    };
    maxI = maxI.toString();
    let data_ = "unknown";
    if(type==="text") {
      layout = layout.concat({i:maxI, x:0, y:0, w:3, h:1});
      data_ = form_state.values[type];
    }
    else if(type==="image") {
      layout = layout.concat({i:maxI, x:0, y:0, w:3, h:3});
      data_ = form_state.values[type];
    } else if(type === "plotly") {
      console.log("Adding plotly layout with i=", maxI, 
        "[elements]=", this.state.elements.length,
        "[layout]=", this.state.layout.length);
      layout = layout.concat({i:maxI, x:0, y:0, w:5, h:5});
      fetch(form_state.values[type].file_name)
        .then( r => r.text() )
        .then( t => this.loadPlotly(t, maxI, form_state.values[type].type, form_state.values[type].mode));
      data_ = [{x:[1,2,3,4,5,6], y:[1,2,3,3,2,1], type:"scatter"}];
    } else {
      console.log("Unknown element type ",type);
      return;
    };
    // adding new element record
    let elements = this.state.elements;
    elements = elements.concat({type:type, data:data_, i:maxI});
    // saving the state
    this.setState({layout: layout, elements:elements}); 
  }



  removeElement(i) {
    const index = this.search_layout_index(i);
    console.log("Removing element: i=",i, " index=", index);
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
        <div key={el.i}>
          <SaiDash type={el.type} data={el.data}
          i={el.i}
          openEditForm={this.openEditForm}
          removeElement={this.removeElement}
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
      
      resize_plotly("gs"+layoutItem.i);
      
    }
  }


  render() {

    return (
      <div>
        <div>
          <button onClick={this.print_state}>Print State</button>
          <button onClick={(e) => {this.setState({layout:[], elements:[]});}}>
            Clear All
          </button>
          <label>Total #:<span> {this.state.layout.length} , {this.state.elements.length} </span></label>
        </div>
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
        i={this.state.currentI}
        removeElement = {this.removeElement}
        element = {this.state.current_element}
        closeEditForm={this.closeEditForm}
        submitForm={this.submitForm}/>
      <InfoPanel
        layout = {this.state.layout}
        elements = {this.state.elements}
        infoOpened = {this.state.infoOpened}
        />
      </div>
    );
  }
}
