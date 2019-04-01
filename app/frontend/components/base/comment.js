import React from 'react';
import moment from 'moment';

class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        }
    }

    toggleEdit = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        const user = this.props.user;
        const comment = this.props.comment;

        const updateForm = (
            <div className='row'>
                <div className='col'>
                    <form action={comment.update_path} method='post'>
                        <input type='hidden' name='authenticity_token' value={window.csrfToken} />
                        <input type='hidden' name='_method' value='put' />
                        <div className='form-group'>
                            <textarea name='comment[body]' className='form-control'>{comment.body}</textarea>
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='btn btn-warning' value='Update'/>
                        </div>
                    </form>
                    </div>
            </div>

        )

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
                            {this.state.editMode ? updateForm : comment.body}
                        </div>

                        <div className='float-right'>
                            <small>
                                {comment.comment_owner && comment.update.path && comment.update.able && (
                                    <span className='link'
                                          data-turbolinks='false'
                                          onClick={this.toggleEdit}>
                                        {this.state.editMode ? 'Cancel' : 'Edit' }
                                        &nbsp;|&nbsp;
                                    </span>
                                )}
                                {(comment.car_owner || (comment.comment_owner && comment.delete.able)) && comment.delete.path && (
                                    <span>
                                        <a className='delete'
                                           href={comment.delete.path}
                                           data-method='delete'
                                           data-remote='true'
                                        >
                                            delete
                                        </a>
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