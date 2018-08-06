// TODO: add props documentation

import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: props.show || false
        }
    }

    static defaultProps = {
        closeButton: true,
        closeOnClick: true,
        opacity: 0.5,
        dialog: {
            header: true,
            body: true,
            footer: true
        }
    };

    render = () => {
        if (!this.props.show) { return null }

        const closeButton = (
            <button
                className='close'
                onClick={this.props.close}>
                <span>&times;</span>
            </button>
        )


        const header = (
            <div className='modal-header'>
                {this.props.dialog.title && <h5 className='modal-title'>{this.props.dialog.title}</h5>}
                {closeButton}
            </div>
        );

        const body = (
            <div className='modal-body'>
                {this.props.children}
            </div>
        );

        const footer = (
            <div className='modal-footer'>
                <button className='btn btn-secondary'>Close</button>
                <button className='btn btn-primary'>Save changes</button>
            </div>
        );

        const dialog = (
            <div className={'modal-dialog ' + this.props.dialog.cssClass}>
                <div className='modal-content'>
                    {this.props.dialog.header && header}
                    {this.props.dialog.body && body}
                    {this.props.dialog.footer && footer}
                </div>
            </div>
        );

        if (!this.props.dialog) {
            const closeButton = (
                <button
                    className='close'
                    onClick={this.props.close}>
                    <span>&times;</span>
                </button>
            )
        }

        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName='fade'
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={100}>

                    <div className='modal fade show'>
                        {closeButton}
                        {(this.props.dialog && dialog) || (
                            <div className='modal-content'>
                                {this.props.children}
                            </div>
                        )}
                    </div>
                    <div className='modal-backdrop fade show'
                         onClick={this.props.close}
                         style={{opacity: this.props.opacity}}/>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default Modal