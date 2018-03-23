// import PropTypes from 'prop-types';
// import Image from './image';

class CarImages extends React.Component {

    propTypes: {
        images: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            mainImage: this.props.images.find(image => image.main == true) || this.props.images[0],
            hasError: false
        };
        this.changeMain = this.changeMain.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
        this.mainImageSelector = $('.main-image')
    }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate()')
    //     const $node = $(ReactDOM.findDOMNode(this)).find('.main-image')
    //     $node.addClass('hide-left');
    //     // setTimeout(()=>{$node.addClass('hide-left')}, 500)
    // }
    //
    // componentDidUpdate() {
    //     const $node = $(ReactDOM.findDOMNode(this)).find('.main-image')
    //     setTimeout(()=>{$node.removeClass('hide-left')}, 500)
    //
    //     // $(ReactDOM.findDOMNode(this)).css('border', '10px solid red')
    // }

    // componentDidCatch(error, info) {
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    //     // You can also log the error to an error reporting service
    //     logErrorToMyService(error, info);
    // }

    activeImageIndex() {
        return this.props.images.map(img => img.id).indexOf(this.state.mainImage.id)
    }

    prevImage() {
        this.mainImageSelector.addClass('animated slideOutLeft')
        const prevIndex = this.activeImageIndex() - 1
        if (prevIndex > 0) {
            this.changeMain(this.props.images[prevIndex].id)
        } else {
            this.changeMain(this.props.images[this.props.images.length - 1].id)
        }
    }

    nextImage() {
        this.mainImageSelector.addClass('animated slideOutRight')
        const nextIndex = this.activeImageIndex() + 1
        if (nextIndex < this.props.images.length) {
            this.changeMain(this.props.images[nextIndex].id)
        } else {
            this.changeMain(this.props.images[0].id)
        }
    }

    changeMain(id) {
        this.setState({ mainImage: this.props.images.find(image => image.id === id) });
    }

    renderLeft() {
        return (
            <div className="arrow arrow-left pointable" onClick={this.prevImage}>
                <i className="fas fa-chevron-left "></i>
            </div>
        )
    }

    renderRight() {
        return (
            <div className="arrow arrow-right pointable" onClick={this.nextImage}>
                <i className="fas fa-chevron-right "></i>
            </div>
        )
    }

    render() {
        return (
            <div className="car-images">
                {this.renderLeft()}
                <div className='main-image'>
                    <Image src={this.state.mainImage.url} className='img-fluid'/>
                </div>
                {this.renderRight()}
                <ImageSet
                    images={this.props.images}
                    mainImage={this.state.mainImage}
                    nextImage={this.nextImage}
                    prevImage={this.prevImage}
                    clickHandler={this.changeMain}
                    activeImageIndex={this.activeImageIndex()}
                >
                </ImageSet>
            </div>
        )
    }
}
