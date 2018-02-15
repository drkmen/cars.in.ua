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
    }

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
        const prevIndex = this.activeImageIndex() - 1
        if (prevIndex > 0) {
            this.changeMain(this.props.images[prevIndex].id)
        } else {
            console.log(this.props.images.length)
            this.changeMain(this.props.images[this.props.images.length - 1].id)
        }
    }

    nextImage() {
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
                <div className='main-image'>
                    {this.renderLeft()}
                    <Image src={this.state.mainImage.url} className='img-fluid'/>
                    {this.renderRight()}
                </div>
                <div className='images'>
                    {this.props.images.map(image =>
                        <div className={this.state.mainImage.id === image.id ? 'image active' : 'image'} key={image.id}>
                            <Image
                                id={image.id}
                                src={image.url}
                                height={100}
                                width={100}
                                key={image.id}
                                clickHandler={this.changeMain}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
