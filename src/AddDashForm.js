import React from 'react'

export default class AddDashForm extends React.Component {
    state = {
        values:{"text":"Enter text", "image":"./bgsu.png", "plotly":"./table.txt"}
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    };

    handleAdd(event) {
        this.props.handleAddElement(event, this.state);
    }

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
                        <input type="text" name="text" value={this.state.values["text"]} onChange={this.handleChange}/>
                    </label>
                    <input type="button" name="text" value="Add Text" onClick = {this.handleAdd}/>
                </form>
                <form>
                    <label>
                        Image:
                        <input type="text" name="image" value={this.state.values["image"]} onChange={this.handleChange}/>
                    </label>
                    <input type="button" name="image" value="Add Image" onClick = {this.handleAdd}/>
                </form>
                <form>
                    <label>
                        Plotly:
                        <input type="text" name="plotly" value={this.state.values["plotly"]} onChange={this.handleChange}/>
                    </label>
                    <input type="button" name="plotly" value="Add Plotly" onClick = {this.handleAdd}/>
                </form>

            </div>
        )
    }
}