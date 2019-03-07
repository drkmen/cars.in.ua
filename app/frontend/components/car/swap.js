import React from 'react';
import moment from 'moment';

class Swap extends React.Component {

    render() {
        const swap = this.props.swap
        const user = swap.user
        return (
            <div className={swap.active ? 'swap' : 'swap declined'}>
                <div className='media'>
                    <img className='mr-3 img-fluid rounded-circle' src={user.avatar.url} width='50' height='50'/>
                    <div className='media-body'>
                        <div>
                            <h5 className='d-inline mt-0'>
                                {user.name}
                                <small>, suggested Swap </small>
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
                                {swap.swap_owner && (swap.update_path || swap.delete_path) && (
                                    <div>
                                        {swap.update_path && swap.active && (
                                            <a href={swap.update_path}>Edit</a>
                                        )}
                                        &nbsp;|
                                        {swap.delete_path && swap.active && (
                                            <a className='delete' href={swap.delete_path} data-method='delete'> delete</a>
                                        )}
                                    </div>
                                )}
                                {swap.car_owner && swap.decline_path && swap.active && (
                                    <span> |
                                        <a className='delete' href={swap.decline_path} > decline</a>
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