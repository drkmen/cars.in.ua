// import PropTypes from 'prop-types';
// import Image from './image';

class CarImages extends React.Component {

    propTypes: {
        // image: PropTypes.instanceOf(Image)
        // images: PropTypes.arrayOf(PropTypes.instanceOf(Image))
        // images: PropTypes.arrayOf(PropTypes.instanceOf(Image))
        images: PropTypes.array,
    }

    constructor(props) {
        super(props);
        this.state = {
            mainImage: this.props.images.find(image => image.main == true),
            hasError: false
        };
        this.changeMain = this.changeMain.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
    }

    componentDidCatch(error, info) {
        // console.log('error');
        // console.log(error);
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
    }

    activeImageIndex() {
        return this.props.images.map(img => img.id).indexOf(this.state.mainImage.id)
    }

    prevImage() {
        const prevIndex = this.activeImageIndex() - 1
        if (prevIndex > 0) {
            this.changeMain(this.props.images[prevIndex].id)
        }
    }

    nextImage() {
        const nextIndex = this.activeImageIndex() + 1
        if (nextIndex < this.props.images.length) {
            this.changeMain(this.props.images[nextIndex].id)
        }
    }

    changeMain(id) {
        this.setState({ mainImage: this.props.images.find(image => image.id === id) });
    }

    renderLeft() {
        return <div className="nalevo" onClick={this.prevImage}>-</div>
    }

    renderRight() {
        return <div className="napravo" onClick={this.nextImage}>+</div>
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        // return this.props.children;
        // console.log(this.props.images.filter(image => image.main)[0].src)
        return (
            <div className="car-images">
                {this.renderLeft()}
                <Image src={this.state.mainImage.src}/>
                {this.renderRight()}
                {this.props.images.map(image =>
                    <div className={this.state.mainImage.id === image.id ? 'image active' : 'image'} key={image.id}>
                        <Image
                            id={image.id}
                            src={image.src}
                            height={100}
                            width={100}
                            key={image.id}
                            clickHandler={this.changeMain}
                        />
                    </div>
                )}
            </div>
        )
    }
}
