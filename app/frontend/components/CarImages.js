import React from "react"
import PropTypes from "prop-types"
import ImageSet from './ImageSet'
import Image from "./image"

class CarImages extends React.Component {

    propTypes: {
        images: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            mainImage: this.props.images.find(image => image.main == true) || this.props.images[0],
            hasError: false,
            error: null
        };
        this.changeMain = this.changeMain.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
    }

    componentDidMount() {
        $('#cars-slider').carousel({
            interval: false
        })
    }

    componentDidCatch(error, _info) {
        this.setState({ hasError: true, error: error });
    }

    activeImageIndex() {
        return this.props.images.map(img => img.id).indexOf(this.state.mainImage.id)
    }

    prevImage() {
        const prevIndex = this.activeImageIndex() - 1
        if (prevIndex > 0) {
            this.changeMain(this.props.images[prevIndex].id)
        } else {
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

    render() {
        if (this.state.hasError) {
            return this.state.error
        }
        return (

            <div className="car-images">

                <div id="cars-slider" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            <Image src={this.state.mainImage.url} className='d-block w-100 img-fluid'/>
                        </div>

                        {this.props.images.map(image =>
                            <div key={image.id} className="carousel-item">
                                <Image key={image.id} src={image.url} className='d-block w-100 img-fluid'/>
                            </div>
                        )}

                    </div>

                    <a className="carousel-control-prev" href="#cars-slider" role="button"
                       data-slide="prev" onClick={this.prevImage}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#cars-slider" role="button"
                       data-slide="next" onClick={this.nextImage}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <div className='row image-set mx-auto'>
                    <div className='col-md-12 mx-auto'>
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
                </div>
            </div>
        )
    }
}

export default CarImages
