import React from 'react'

export default class AddDashForm extends React.Component {
    state = {
        text_text: "Enter text",
        image_path: "./bgsu.png"
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
        if(event.target.name === "text") {
            this.setState({text_text:event.target.value});
        } else if(event.target.name === "image") {
            this.setState({image_path: event.target.value});
        }
    };
    render() {
        return(
            <div>
                <form>
                    <label>
                        Text:
                        <input type="text" name="text" value={this.state.text_text} onChange={this.handleChange}/>
                    </label>
                    <input type="button" name="add_text" value="Add Text" onClick = {this.handleAdd}/>
                </form>
                <form>
                    <label>
                        Image:
                        <input type="text" name="image" value={this.state.image_path} onChange={this.handleChange}/>
                    </label>
                    <input type="button" name="add_image" value="Add Text" onClick = {this.handleAdd}/>
                </form>
            </div>
        )
    }
}