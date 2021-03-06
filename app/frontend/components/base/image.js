import React from 'react'
import PropTypes from 'prop-types'

class Image extends React.Component {

    static defaultProps = {
        changeActive: function(){},
    };

    changeActive(id) {
        return e => {
            e.stopPropagation();

            this.props.changeActive(id);
        };
    }

    propTypes: {
        id: PropTypes.string,
        src: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        main: PropTypes.boolean
    }

    render() {
        return (
            <img src={this.props.image.url}
                 width={this.props.width}
                 height={this.props.height}
                 onClick={this.changeActive(this.props.id)}
                 className={this.props.className}
            />
        )
    }
}

export default Image
