import React from 'react';
import Comment from '../base/comment';

class Comments extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div className='comments'>
                Comment list
                {this.props.comments.map(comment =>
                    <Comment key={comment.id} comment={comment} user={comment.user}></Comment>
                )}
            </div>
        )
    }

}

export default Comments