import React from 'react';
import ReactModal from 'react-modal';

export default class EditForm extends React.Component {
    render() {
        return(
            <ReactModal 
                isOpen={this.props.isOpen}
                ariaHideApp={false}
            >
                 <div>Editing Dash # {this.props.index}</div>
                 <button onClick={this.props.closeEditForm}>Close</button>
                 <button onClick={() => {
                     this.props.removeElement(this.props.index);
                     this.props.closeEditForm();
                 }}> Remove Element</button>
            </ReactModal>
        );
    }
}