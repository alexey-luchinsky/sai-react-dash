import React from 'react'
import {SaiDash, resize_plotly, refreshPlotly} from './SaiDash.js';
import AddDashForm from './AddDashForm.js';
import EditForm from './EditForm.js';
import RGL, { WidthProvider } from "react-grid-layout";
import start_dashes from './start_dashes.js';
const ReactGridLayout = WidthProvider(RGL);

export default class SaiDashboard extends React.Component {
  // state = {dashes:{
  //          keyI:{layout,type, metaData, innerData},
  //          ...
  //          }
  //    showEditForm
  //    current_dash
  // ]}
  // where keyI: i field of the RGD layout
  //        layout: RGD layout without 'i' field
  //        type:   type of the dash ('text', 'image', 'plotly', etc)
  //        metaData: path to image file, path to plotly table, etc. This data can be edited
  //        innerData: the image, table for plotly, etc. This data is generated from metaData
  state = {
     dashes: start_dashes,
     showEditForm: false,
     current_dash: {metaData:[]}
  }


  print_state() {
    console.log(this.state);
  }

  generate_layout = () => {
    const dashes = this.state.dashes;
    return Object.keys(dashes).map( K => {
      var L = dashes[K].layout;
      L["i"] = K;
      return L;
    })
  }

  /**
   * Opens an edit form for a selected dash
   * @param {String} keyI --- key of the edited dash
   */
  openEditForm(keyI) {
    this.setState({
      current_dash: this.state.dashe[keyI]})
    this.setState({showEditForm:true});
    // store the data of the current element in the EditForm data
    this.editFormRef.current.setState({metaData:this.state.dashes[keyI].metaData})
  }

  closeEditForm() {
    this.setState({showEditForm:false});
  }


  /**
   * Modifies the data of the elelent and closes the edit form
   * @param {String} keyI: thkey of the modified dash
   * @param {Array} dat: new data
   */
  submitForm(keyI, metaData) {
    console.log("EditForm submitted, keyI=", keyI," metaData=", metaData);
    let dashes = this.state.dashes;
    dashes[keyI].metaData = metaData;
    dashes[keyI].innerData = this.createInnerData(keyI, dashes[keyI].type, metaData);
    this.setState({dashes:dashes});
    this.closeEditForm();
  }

  createInnerData(keyI, type, metaData) {
    console.log("createInnerData:", type, metaData)
    if(type === "text") {
      return {text: metaData.text};
    }
    else if(type === "image") {
      return {filePath: metaData.filePath}
    }
    else if(type === "plotly") {
      console.log("Reading plotly inner data from file ", metaData.filePath);
      fetch(metaData.file_name)
        .then( r => r.text())
        .then( t => this.loadPlotly(t, keyI) );
    }
  }



  constructor(porps) {
    super(porps);
    this.editFormRef = React.createRef();     // reference to the EditForm modal
    this.removeElement = this.removeElement.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.addElement = this.addElement.bind(this);
    this.resize_event = this.resize_event.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.print_state = this.print_state.bind(this);
  }

  componentDidMount() {
    // filling innerData fields
    var dashes = this.state.dashes;
    Object.keys(dashes).map( (k) => {  
        dashes[k].innerData = this.createInnerData(k, dashes[k].type, dashes[k].metaData);
      }
    );
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.print_state}>Print State</button>
          <button onClick={(e) => {this.setState({dashes:{}});}}>
            Clear All
          </button>
          <label>Total #:<span> {Object.keys(this.state.dashes).length} </span></label>
        </div>
      <AddDashForm
        handleAddElement = {this.addElement}/>
      <ReactGridLayout 
        className="layout" 
        layout={this.generate_layout()} 
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
        ref = {this.editFormRef}
        isOpen={this.state.showEditForm}
        i={this.state.currentI}
        removeElement = {this.removeElement}
        element = {this.state.current_dash}
        closeEditForm={this.closeEditForm}
        submitForm={this.submitForm}/>
      </div>
    );
  }

  get_elements = () => {
    const dashes = this.state.dashes;
    return(
      Object.keys(dashes).map( (k) => {
        var dash = dashes[k];
        return(
          <div key={k}>
            <SaiDash type={dash.type} i={k} data={dash.innerData}
              removeElement = {this.removeElement}/>
            {/* <SaiDash type={dash.type} data={dash.metaData}
            i={k}
            openEditForm={this.openEditForm}
            removeElement={this.removeElement}
            /> */}
          </div>
        );
      })
    )
  }

    /**
   * Parses the text loaded from CSV file and stores it in the plotly dash
   * @param {String} tableText 
   * @param {String} keyI 
   * @param {Array} plotlyType 
   * @param {Array} plotlyMode 
   */
     loadPlotly(tableText, keyI, plotlyType, plotlyMode) {
       console.log("Parsing text ", tableText);
      // parsing the text and create plotly data
      var T = tableText.split("\n");
      T = T.map( L => L.split(" ").map( (E) => parseInt(E)));
      T = T.filter(L => L.length >1);
      var data_ = [{
        x: T.map( (a) => a[0]),
        y: T.map( (a) => a[1])
      }];
      // save it in the corresponding element and update the state
      var dashes = this.state.dashes;
      dashes[keyI].innerData = {data:data_};
      this.setState({dashes:dashes});
      console.log("added plotly", data_)
      refreshPlotly(keyI, data_);

    }  
  
    // Adding a new element (called from AddDashForm)
    async addElement(event, form_state) {
      console.log("addElement(",event,form_state);
      const type = event.target.name;
      const dashes = this.state.dashes;
      // Adding new layout record
      let maxI=0;
      if( Object.keys(dashes).length>0) {
        maxI = Math.max(...Object.keys(dashes).map(K => parseInt(K)))+1;
      };
      maxI = maxI.toString();
      console.log("maxI=", maxI)
      let metaData = "unknown", layout = {x:0, y:0, w:1, h:1};
      if( type === "text") {
        layout = {x:0, y:0, w:3, h:1};
        metaData = form_state.values["text"];
      } else if(type === "image") {
        layout = {x:0, y:0, w:3, h:3};
        metaData = form_state.values["image"];
      } else if(type === "plotly") {
        layout = {x:0, y:0, w:3, h:3};
        metaData = form_state.values["plotly"];
      }
      dashes[maxI] = {layout:layout, type:type, metaData:metaData, innerData:this.createInnerData(maxI, type, metaData)};
      this.setState({dashes:dashes});
    }
  
  /**
   * Removes the dash with the given key from the dashboard
   * @param {String} keyI 
   */
   removeElement(keyI) {
    console.log("Removing element: i=",keyI);
    var dashes = this.state.dashes;
    delete dashes[keyI];
    this.setState({dashes:dashes});
  }

    /**
   * Updates the layout state with the change of RGL layout
   * @param {list} layout 
   */
     handleLayoutChange(layout) {
       console.log("handleLayoutChange:", layout)
      var dashes = this.state.dashes;
      layout.forEach( newLayout => {
        var keyI = newLayout.i;
        var L = newLayout;
        delete L["i"];
        dashes[keyI].layout = L;  
      })
      this.setState({dashes:dashes, layout:layout})
      }
  


  /**
   * If the Plotly dash is resized updates the size of the plot
   * @param {Array} layout 
   * @param {Array} oldLayoutItem 
   * @param {Array} layoutItem 
   * @param  placeholder 
   */
   resize_event(layout, oldLayoutItem, layoutItem, placeholder) {
    console.log("onResize: layoutImem=",layoutItem.i);
    var keyI = layoutItem.i;
    this.handleLayoutChange(layout);
    // plotly graph resizing 
    if( this.state.dashes[keyI].type === "plotly") {
      console.log("Resizing Plotly key=",keyI);
      resize_plotly("gs"+layoutItem.i);
    }
  }

}
