import React from 'react';
import ReactModal from 'react-modal';

export default class EditForm extends React.Component {
    render() {
        return(
            <ReactModal isOpen={this.props.isOpen}>
                 <div>Editing Dash # {this.props.index}</div>
            </ReactModal>
        );
    }
}