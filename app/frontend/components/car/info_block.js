import React from 'react';

class InfoBlock extends React.Component {

    render(){
        return(
            <div className='info-block'>
                {/*<div className='icon'>*/}
                    {/*<i className={this.props.icon}/>*/}
                {/*</div>*/}
                <div className='info text-center'>
                    <small className='font-300'>{this.props.desc}</small>
                    <p>
                        <b className='font-700'>{this.props.value}</b>
                    </p>
                </div>
            </div>
        )
    }

}

export default InfoBlock