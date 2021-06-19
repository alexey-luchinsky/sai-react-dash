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
                 <div className="row">
                    <div className="column" style={{float:"left",width:"50%"}}>
                        <button onClick={this.props.closeEditForm}>Close</button>
                    </div>
                    <div className="column" style={{float:"right",width:"50%"}}>
                        <button onClick={() => {
                            this.props.removeElement(this.props.index);
                            this.props.closeEditForm();
                        }}> Remove Element</button>
                        {preview}
                    </div>
                 </div>
            </ReactModal>
        );
    }
}