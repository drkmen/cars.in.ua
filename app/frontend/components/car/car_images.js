import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../base/slider';

class CarImages extends React.Component {

    propTypes: {
        images: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            activeImage: this.props.images.find(image => image.main == true) || this.props.images[0],
            hasError: false,
            error: null
        };
    }

    componentDidCatch = (error, _info) => {
        this.setState({ hasError: true, error: error });
    }

    activeImageIndex = () => {
        return this.props.images.map(img => img.id).indexOf(this.state.activeImage.id)
    }

    prevImage = () => {
        const prevIndex = this.activeImageIndex() - 1
        if (prevIndex > 0) {
            this.changeActive(this.props.images[prevIndex].id)
        } else {
            this.changeActive(this.props.images[this.props.images.length - 1].id)
        }
    }

    nextImage = () => {
        const nextIndex = this.activeImageIndex() + 1
        if (nextIndex < this.props.images.length) {
            this.changeActive(this.props.images[nextIndex].id)
        } else {
            this.changeActive(this.props.images[0].id)
        }
    }

    changeActive = (id) => {
        this.setState({ activeImage: this.props.images.find(image => image.id === id) });
        // this.activeImage = this.props.images.find(image => image.id === id)
    }

    render = () => {
        if (this.state.hasError) {
            return this.state.error
        }

        return (

            <div className="car-images">

                {/* TODO: add modal with fullscreen image */}

                <Slider
                    images={this.props.images}
                    nextImage={this.nextImage}
                    prevImage={this.prevImage}

                    changeActive={this.changeActive}
                    activeImage={this.state.activeImage}
                    activeImageIndex={this.activeImageIndex}

                    controlls={true}
                    navigation={true}
                />

                {/*<div className='row image-set mx-auto'>*/}
                    {/*<div className='col-md-12 mx-auto'>*/}
                    {/*<ImageSet*/}
                        {/*images={this.props.images}*/}
                        {/*nextImage={this.nextImage}*/}
                        {/*prevImage={this.prevImage}*/}
                        {/*clickHandler={this.changeMain}*/}
                        {/*activeImage={this.mainImage}*/}
                        {/*activeImageIndex={this.activeImageIndex()}*/}
                    {/*/>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default CarImages
