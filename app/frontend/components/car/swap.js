import React from 'react';
import moment from "../base/comment";

class Swap extends React.Component {

    render() {
        const swap = this.props.swap
        console.log(swap)
        const user = swap.user
        console.log(user)
        return (
            <div className='swap'>
                <div className="media">
                    <img className="mr-3 img-fluid rounded-circle" src={user.avatar.url} alt="" width='50' height='50'/>
                    <div className="media-body">
                        <div>
                            <h5 className="d-inline mt-0">
                                {user.name}
                            </h5>
                            <small className='grey float-right'>
                                {moment(swap.created_at).fromNow()}
                            </small>
                        </div>

                        <div>
                            {swap.message}
                            {swap.swap_for}
                        </div>

                        <div className='float-right'>
                            <small>
                                {swap.swap_owner && swap.swap_path && (
                                    <a href={swap.update_path}>Edit</a>
                                )}
                                {(swap.car_owner || swap.swap_owner) && swap.delete_path && (
                                    <span> |
                                        <a className='delete' href={swap.delete_path} data-method="delete"> Delete</a>
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

export default Swap