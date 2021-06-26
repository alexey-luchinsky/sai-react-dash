import React from 'react'

export default class AddDashForm extends React.Component {
// UPDATE HERE TO INTRODUCE NEW DASH TYPE
    state = {
        values:{
            "text":{text:"Enter text"}, 
            "image":{filePath:"./bgsu.png"},
            "plotly":{file_name:"./table.txt", layout:[], mode:[]},
            "probe": {info:"info"}
        },
        display:false
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.addElement = this.addElement.bind(this);
    };

    addElement(event) {
        this.props.handleAddElement(event, this.state);
        this.toggleDisplay();
    }

// UPDATE HERE TO INTRODUCE NEW DASH TYPE
    handleChange(event) {
        let values = this.state.values,
            type = event.target.name,
            new_val = event.target.value;
        if(type === "text") {
            values[type].text = new_val;
        }
        else if(type === "image") {
            values[type].filePath = new_val;
        }
        else if(type === "plotly") {
            values[type].file_name = new_val;
        }
        else if(type === "probe") {
            values[type].info = new_val;
        }
        this.setState(values);
    };

    /**
     * converts boolean argument to "block" or "none"
     * @param {bool} disp 
     */
    display_to_string(disp) {
        return disp ? "block" : "none";

    }

    /**
     * Toggles the distplay state
     */
    toggleDisplay() {
        this.setState({display: !this.state.display});
    }

    render() {
        return(
            <div>
                <button onClick={this.toggleDisplay}>Add...</button>
                <div   style={{display:this.display_to_string(this.state.display)}}>
                <form>
                    <label>
                        Text:
                        <input type="text"
                        name="text"
                        value={this.state.values["text"].text}
                        onChange={this.handleChange}/>
                    </label>
                    <input type="button"
                     name="text"
                      value="Add Text"
                       onClick = {this.addElement}
                    />
                </form>
                <form>
                    <label>
                        Image:
                        <input type="text"
                        name="image"
                        value={this.state.values["image"].filePath}
                        onChange={this.handleChange}/>
                    </label>
                    <input type="button"
                     name="image"
                      value="Add Image"
                       onClick = {this.addElement}
                    />
                </form>
                <form>
                    <label>
                        Plotly:
                        <input type="text" name="plotly" 
                        value={this.state.values["plotly"].file_name} 
                        onChange={this.handleChange}/>
                    </label>
                    <input type="button"
                     name="plotly"
                      value="Add Plotly"
                       onClick = {this.addElement}
                    />
                </form>
 {/* UPDATE HERE TO INTRODUCE NEW DASH TYPE */}
                <form>
                    <label>
                        Probe:
                        <input type="text" name="probe" 
                        value={this.state.values["probe"].info} 
                        onChange={this.handleChange}/>
                    </label>
                    <input type="button"
                     name="probe"
                      value="Add Probe"
                       onClick = {this.addElement}
                    />
                </form>
             </div>
            </div>
        )
    }
}