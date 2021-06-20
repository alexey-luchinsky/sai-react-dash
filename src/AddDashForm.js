import React from 'react'

export default class AddDashForm extends React.Component {
    state = {
        values:{
            "text":"Enter text", 
            "image":"./bgsu.png", 
            "plotly":{file_name:"./table.txt", type:"scatter", mode:"markers"}}
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };


    handleChange(event) {
        let values = this.state.values;
        values[event.target.name] = event.target.value;
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
                        value={this.state.values["text"]}
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
                        value={this.state.values["image"]}
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