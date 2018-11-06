import React from 'react';
import Option from './option'

class Options extends React.Component {

    render(){
        const size = this.props.options.length
        return(
            <div className='row options'>
                {this.props.options.map(options =>
                    <div className={'col-' + 12 / size + ' options-group'}>
                        {options.type}
                        <hr/>
                        {options.options.map(option =>
                            <Option key={option.id} option={option}/>
                        )}
                    </div>
                )}
            </div>
        )
    }

}

export default Options