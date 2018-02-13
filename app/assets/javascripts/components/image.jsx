class Image extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     squares: Array(9).fill(null)
        // };
    }

    handleClick(id) {
        return e => {
            e.stopPropagation();

            this.props.clickHandler(id);
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
