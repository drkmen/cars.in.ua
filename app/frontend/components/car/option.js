import React from 'react';

class Option extends React.Component {

    render(){
        return(
            <div className='option'>
                {this.props.option.name}
            </div>
        )
    }

}

export default Option