import React from 'react';

export default class EditForm extends React.Component {
    render() {
        return(
            <button onClick={this.props.removeElement(this.props.index)}>
                Remove Element
            </button>
        )
    }
}