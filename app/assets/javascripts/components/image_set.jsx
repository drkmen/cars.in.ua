// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

class ImageSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }
        this.leftPoint = 0
        this.rightPoint = 6
        this.handleClick = this.handleClick.bind(this)
        this.updateBorders = this.updateBorders.bind(this)
    }

    updateBorders() {
        const imagesLength = this.props.images.length

        this.leftPoint = Math.max(0, this.props.activeImageIndex - 3),
        this.rightPoint = Math.min(imagesLength, this.props.activeImageIndex + 3)

        if ([0, 1, 2].includes(this.props.activeImageIndex) && this.leftPoint == 0 ) {
            this.rightPoint = 6
        }
        if ([imagesLength, imagesLength - 1, imagesLength - 2].includes(this.props.activeImageIndex) && this.rightPoint == imagesLength) {
            this.leftPoint = imagesLength - 7
        }
        console.log('updateBorders', this.leftPoint, this.rightPoint)
    }

    // componentDidMount() {
    //     this.updateBorders()
    // }

    // componentWillReceiveProps(_newProps) {
    //     // console.log('new activeImageIndex', newProps.activeImageIndex)
    //     // this.forceUpdate()
    //     this.updateBorders()
    // }

    // componentDidUpdate() {
    //     // console.log('DID UPDATE')
    //     // console.log(this.props.activeImageIndex)
    //     this.updateBorders()
    // }

    handleClick(e) {
        this.props.clickHandler(e)
    }

    render() {
        console.log('render')
        console.log(this.leftPoint, this.props.activeImageIndex, this.rightPoint)
        let imagesArray = this.props.images
        this.updateBorders()
        if (this.state.collapsed) {
            imagesArray = imagesArray.slice(this.leftPoint, this.rightPoint + 1)
        }
        console.log('imagesArray', imagesArray.length)
        return (
            <div className='images'>
                {imagesArray.map(image =>
                    <div className={this.props.mainImage.id === image.id ? 'image active' : 'image'} key={image.id}>
                        <Image
                            id={image.id}
                            src={image.url}
                            height={100}
                            width={100}
                            key={image.id}
                            handleClick={this.handleClick}
                        />
                    </div>
                )}
            </div>
        )
    }
}
