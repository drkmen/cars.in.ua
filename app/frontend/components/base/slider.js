import React from 'react';
import Image from './image';
import ImageSet from '../imageSet';
import Modal from './modal';

class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    componentDidMount = () => {
        this.slider = $('#cars-slider')
        this.slider.carousel({
            interval: false
        })
    };

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    };

    render = () => {
        const controlPrev = (
            <a className='carousel-control-prev'
               href='#cars-slider'
               role='button'
               data-slide='prev'
               onClick={this.props.prevImage}>
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
            <div id='cars-slider' className='carousel slide' data-ride='carousel' >
                <div className='trigger' onClick={this.toggleModal}>
                    aloaloalo
                </div>
                <div className='trigger' onClick={this.toggleModal}>
                    <Image
                        image={this.props.activeImage}
                        className='d-block w-100 img-fluid'
                    />
                </div>
                <Modal
                    show={this.state.showModal}
                    close={this.toggleModal}
                    dialog={false}
                    opacity={0.8}>
                    <div className='modal-body mx-auto'>
                        <Image
                            image={this.props.activeImage}
                            className='d-block img-fluid'
                        />
                    </div>
                </Modal>

                {this.props.controlls && controlPrev}
                {this.props.controlls && controlNext}
                {this.props.navigation && navigation}
            </div>
        )
    }
}

export default Slider