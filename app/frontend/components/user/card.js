import React from 'react';

class Card extends React.Component {
    render() {
        return(
            <div className='user-card'>
                {this.props.name}
            </div>
        )
    }
}

export default Card;
