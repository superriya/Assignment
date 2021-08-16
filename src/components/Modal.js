import React, { Component } from 'react'


export default class Modal extends Component {
    render() {
        return (
            <div className="modalApp">
                <div className="modal-overlay">
                    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Vehicle Details</h3>
                                <button type="button" className="modal-close-button" 
                                onClick={this.props.hide}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5 className="modal-title">Emissions</h5>
                                    <p>{ this.props.emissions }</p>
                                <h5 className="modal-title">Passengers</h5>
                                    <p>{ this.props.passengers }</p>
                                <h5 className="modal-title">Drivetrain</h5>
                                    <p>{ this.props.drivetrain }</p>
                                <h5 className="modal-title">Bodystyles</h5>
                                    <p>{ this.props.bodystyles }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
