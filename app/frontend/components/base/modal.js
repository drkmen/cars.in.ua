import React from 'react'

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: props.open || false
        }
    }

    componentDidMount = () => {
        this.modal = $('#modal')
        this.modal.modal('hide')
    }

    closeModal = () => {
        console.log($('#modal'));
        $('#modal').modal('hide')
        console.log($(this).modal)
        $(this).modal('hide')
    }

    openModal = () => {
        this.modal.modal('show')
    }

    render = () => {
        return (
            <div className="modal fade"
                 id="modal"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                {/*<div className="modal-dialog" role="document">*/}
                    {/*<div className="modal-content">*/}
                        {/*<div className="modal-header">*/}
                            {/*<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>*/}
                            <button onClick={this.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        {/*</div>*/}
                        {/*<div className="modal-body">*/}
                            {/*...*/}
                        {/*</div>*/}
                        {/*<div className="modal-footer">*/}
                            {/*<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
                            {/*<button type="button" className="btn btn-primary">Save changes</button>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Modal