import { throwStatement } from '@babel/types';
import React from 'react';
import ReactModal from 'react-modal';
import {SaiDash} from './SaiDash';


export default class EditForm extends React.Component {

    state={data: this.props.element.data};


    editTextForm() {
        return <form>
            <label>
                Edit Text
                <input type="text" value={this.state.data} 
                onChange={(e) => {
                    this.setState({data: e.target.value})
                    }}/>
            </label>
        </form>
    }

    render() {
        let element = this.props.element;
        let preview = <div>Element is empty</div>;
        let editPane = <div>Element is empty</div>
        if(element) {
            preview = <SaiDash type={element.type} data={element.data}/>;
            if(element.type === "text") {
                console.log("edit text");
                editPane = this.editTextForm();
            }
            else {
                editPane = <div>The element type {this.props.element.type} cannot be edited</div>;
            }

        };
        return(
            <ReactModal 
                isOpen={this.props.isOpen}
                ariaHideApp={false}
            >
                 <div className="row">
                    <div className="column" style={{float:"left",width:"50%"}}>
                        <button 
                            onClick={(e) => {
                                this.props.submitForm(this.props.index, this.state.data)
                            }}> Submit </button>
                        <button onClick={this.props.closeEditForm}>Cancel</button>
                        {editPane}
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