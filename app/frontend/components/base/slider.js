import React from 'react'
import Image from '../image'
import ImageSet from '../imageSet'

class Slider extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     activeImage: props.activeImage,
        //     activeImageIndex: props.activeImageIndex()
        // }
    }

    componentDidMount = () => {
        $('#cars-slider').carousel({
            interval: false
        })
    }

    render = () => {
        const controlPrev = (
            <a className='carousel-control-prev' href='#cars-slider' role='button'
               data-slide='prev' onClick={this.props.prevImage}>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='sr-only'>Previous</span>
            </a>
        )

        const controlNext = (
            <a className='carousel-control-next' href='#cars-slider' role="button"
               data-slide='next' onClick={this.props.nextImage}>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='sr-only'>Next</span>
            </a>
        )

        const navigation = (
            <div className='row image-set mx-auto'>
                <div className='col-md-12 mx-auto'>
                    <ImageSet
                        images={this.props.images}
                        changeActive={this.props.changeActive}
                        activeImage={this.props.activeImage}
                        activeImageIndex={this.props.activeImageIndex()}
                    />
                </div>
            </div>
        )

        return (
            <div id='cars-slider' className='carousel slide' data-ride='carousel'>
                <div className='carousel-inner'>
                    {this.props.images.map(image =>
                        <div key={image.id} className={this.props.activeImage.id === image.id ? 'carousel-item active' : 'carousel-item'}>
                            <Image key={image.id} src={image.url} className='d-block w-100 img-fluid'/>
                        </div>
                    )}
                </div>
                {this.props.controlls && controlPrev}
                {this.props.controlls && controlNext}
                {this.props.navigation && navigation}
            </div>
        )
    }
}

export default Slider