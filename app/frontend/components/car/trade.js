import React from 'react';
import moment from 'moment';;

class Trade extends React.Component {

    render(){
        const trade = this.props.trade
        const user = trade.user

        return (
            <div className={trade.active ? 'trade' : 'trade declined'}>
                <div className="media">
                    <img className="mr-3 img-fluid rounded-circle" src={user.avatar.url} alt="" width='50' height='50'/>
                    <div className="media-body">
                        <div>
                            <h5 className="d-inline mt-0">
                                {user.name}
                                <small>, suggested Trade </small>
                            </h5>
                            <small className='grey float-right'>
                                {moment(trade.created_at).fromNow()}
                            </small>
                        </div>

                        <div>
                            {trade.message}
                            {trade.price}
                        </div>

                        <div className='float-right'>
                            <small>
                                {trade.trade_owner && (trade.update_path || trade.delete_path) && (
                                    <div>
                                        {trade.update_path && trade.active && (
                                            <a href={trade.update_path}>Edit |</a>
                                        )}
                                        {trade.delete_path && trade.active && (
                                            <a className='delete' href={trade.decline_path} data-method='delete'>
                                                &nbsp;delete
                                            </a>
                                        )}
                                    </div>
                                )}
                                {trade.car_owner && trade.decline_path && trade.active && (
                                    <span>
                                        <a className='delete' href={trade.decline_path}>| decline</a>
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

export default Trade