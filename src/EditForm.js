import { throwStatement } from '@babel/types';
import React from 'react';
import ReactModal from 'react-modal';
import { SaiDash
 } from './SaiDash';
export default class EditForm extends React.Component {
    render() {
        let preview = <div></div>;
        if(this.props.element) {
            preview = <SaiDash type={this.props.element.type} data={this.props.element.data}/>;
        };
        return(
            <ReactModal 
                isOpen={this.props.isOpen}
                ariaHideApp={false}
            >
                 <div>Editing Dash # {this.props.index}</div>
                 {preview}
                 <button onClick={this.props.closeEditForm}>Close</button>
                 <button onClick={() => {
                     this.props.removeElement(this.props.index);
                     this.props.closeEditForm();
                 }}> Remove Element</button>
            </ReactModal>
        );
    }
}