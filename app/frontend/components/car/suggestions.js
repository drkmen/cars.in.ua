import React from 'react';
import Trade from './trade'
import Swap from './swap'

class Suggestions extends React.Component {

    render(){
        console.log(this.props)
        return(
            <div className='suggestions'>
                {this.props.suggestions.map(suggestion =>
                    suggestion.type == 'swap' && (
                        <Swap key={suggestion.id} swap={suggestion}/>
                    ) || (
                        <Trade key={suggestion.id} trade={suggestion}/>
                    )
                )}
            </div>
        )
    }

}

export default Suggestions