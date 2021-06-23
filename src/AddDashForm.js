import React from 'react'

export default class AddDashForm extends React.Component {
    state = {
        values:{
            "text":{text:"Enter text"}, 
            "image":{filePath:"./bgsu.png"},
            "plotly":{file_name:"./table.txt", layout:[], mode:[]}
        }
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };


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
        this.setState(values);
    };
    render() {
        return(
            <div>
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
                       onClick = {(event) => this.props.handleAddElement(event, this.state)}
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
                       onClick = {(event) => this.props.handleAddElement(event, this.state)}
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
                       onClick = {(event) => this.props.handleAddElement(event, this.state)}
                    />
                </form>

            </div>
        )
    }
}