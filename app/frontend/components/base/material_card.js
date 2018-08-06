import React from 'react';

class MaterialCard extends React.Component {

    render() {
        return (
            <div className={`card material-card ${this.props.cssClass}`}>
                {this.props.children}
            </div>
        )
    }
}

export default MaterialCard