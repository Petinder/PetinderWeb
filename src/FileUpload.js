import React, { Component } from 'react';

class FileUpload extends Component {
    constructor(){
        super();
        //Estados
        this.state = {
            uploadValue: 0
        };
    }
    
    //Mostrar feedback al usuario
    render(){
        return(
            <div>
                <progress value={this.state.uploadValue} max = "100">
                    {this.state.uploadValue} %
                </progress>
                <br/>
                <input type="file" onChange={this.props.onUpload}/>
            </div>
        );
    }
}
export default FileUpload;