import React from 'react'

export default class AddDashForm extends React.Component {
    state = {
        text_text: ""
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        this.setState({text_text:event.target.value});
    };
    render() {
        return(
            <form>
                <label>
                    Text:
                    <input type="text" value={this.state.text_text} onChange={this.handleChange}/>
                </label>
                <input type="button" value="Add Text" 
                onClick = {() => this.props.handleAddTextElement(this.state.text_text)}/>
            </form>
        )
    }
}