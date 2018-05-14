import React from "react"
import PropTypes from "prop-types"

class Image extends React.Component {

    constructor() {
        super();
    }

    handleClick(id) {
        return e => {
            e.stopPropagation();

            this.props.handleClick(id);
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
            <img src={this.props.src}
                 width={this.props.width}
                 height={this.props.height}
                 onClick={this.handleClick(this.props.id)}
                 className={this.props.className}
            />
        )
    }
}

export default Image
