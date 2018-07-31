import React from 'react'
import Modal from './modal'

class ModalLauncher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: props.showModal || false
        }
    }

    toggleModal = () => {
        console.log('modal launcher on click')
        this.setState({ showModal: !this.state.showModal })
    }

    render = () => {
        return (
            <div onClick={this.toggleModal}>
                <div onClick={this.toggleModal}>123</div>
                <div onClick={this.toggleModal}>
                    {this.props.children}
                </div>

                {this.state.showModal && <Modal>{this.props.children}</Modal>}
            </div>
        )
    }

}

export default ModalLauncher