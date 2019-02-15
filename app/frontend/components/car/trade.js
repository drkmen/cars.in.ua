import React from 'react';

class Trade extends React.Component {

    render(){
        return(
            <div className='trade'>
                {this.props.trade.message}
                {this.props.trade.price}
            </div>
        )
    }

}

export default Trade