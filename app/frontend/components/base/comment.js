import React from 'react';

class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        }
    }

    render() {
        return(
            <div className='comment'>
                <div className="media">
                    <img className="mr-3" src={'this.props.user'} alt=""/>
                    <div className="media-body">
                        <h5 className="mt-0">
                            {this.props.user.name}
                        </h5>
                        {this.props.comment.body}
                    </div>
                </div>
                <hr/>
            </div>
        )
    }

}

export default Comment