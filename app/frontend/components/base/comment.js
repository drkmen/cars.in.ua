import React from 'react';
import moment from 'moment';

class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        }
    }

    render() {
        const user = this.props.user || { name: 'Guest' };
        const comment = this.props.comment;
        return (
            <div className='comment'>
                <div className="media">
                    <img className="mr-3 img-fluid rounded-circle" src={user.avatar.url} alt="" width='50' height='50'/>
                    <div className="media-body">
                        <div>
                            <h5 className="d-inline mt-0">
                                {user.name}
                            </h5>
                            <small className='grey float-right'>
                                {moment(comment.created_at).fromNow()}
                            </small>
                        </div>

                        <div>
                            {comment.body}
                        </div>

                        <div className='float-right'>
                            <small>
                                {comment.comment_owner && comment.update_path && (
                                    <a href={comment.update_path}>Edit</a>
                                )}
                                {(comment.car_owner || comment.comment_owner) && comment.delete_path && (
                                    <span> |
                                        <a className='delete' href={comment.delete_path} data-method="delete"> Delete</a>
                                    </span>
                                )}
                                {comment.reply_path && (
                                    <span> |
                                        <a href={comment.reply_path}> Reply</a>
                                    </span>
                                )}
                            </small>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }

}

export default Comment