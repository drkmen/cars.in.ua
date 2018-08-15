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
        });
        // console.log($('.active-image').width())
        // display: flex;flex-flow: row wrap;justify-content: space-between;
    };

    // componentDidMount = () => {
    //     // this.thumbSize = ($('.active-image').width() - 13 * 5) / 14; // 13 blocks with margin 5px, 14 blocks total
    //     // console.log(this.thumbSize);
    //     // if (this.thumbSize < 40) { this.thumbSize = 68 }
    //     // this.forceUpdate() //recalculate correct thumb sizes and rerender
    //     this.updateThumbSizes()
    // };

    // updateThumbSizes = (elem) => {
    //     console.log('slider updateThumbSizes');
    //     console.log($(elem).width());
    //     // this.thumbSize = ($('.active-image').width() - 13 * 5) / 14; // 13 blocks with margin 5px, 14 blocks total
    //     this.thumbSize = ($(elem).width() - 13 * 5) / 14; // 13 blocks with margin 5px, 14 blocks total
    //     // console.log(this.thumbSize);
    //     console.log(this.thumbSize);
    //     if (this.thumbSize < 40) { this.thumbSize = 68 }
    //     // this.forceUpdate() //recalculate correct thumb sizes and rerender
    //     this.setState({ allowToRenderNavigation: true })
    // }

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
            <div className='row image-set'>
                <div className='col-md-12'>
                    <ImageSet
                        images={this.props.images}
                        changeActive={this.props.changeActive}
                        activeImage={this.props.activeImage}
                        activeImageIndex={this.props.activeImageIndex()}
                        // thumbSize={this.thumbSize}
                    />
                </div>
            </div>
        )

        return (
            <div id='cars-slider' className='carousel slide' data-ride='carousel' >
                {/*<div className='trigger' onClick={this.toggleModal}>*/}
                    {/*aloaloalo*/}
                {/*</div>*/}
                <div className='trigger' onClick={this.toggleModal}>
                    <Image
                        image={this.props.activeImage}
                        className='d-block w-100 img-fluid active-image'
                        onMount={this.updateThumbSizes}
                    />
                </div>
                {/*<Modal*/}
                    {/*show={this.state.showModal}*/}
                    {/*close={this.toggleModal}*/}
                    {/*dialog={false}*/}
                    {/*opacity={0.8}>*/}
                    {/*<div className='modal-body mx-auto'>*/}
                        {/*<Image*/}
                            {/*image={this.props.activeImage}*/}
                            {/*className='d-block img-fluid'*/}
                        {/*/>*/}
                    {/*</div>*/}
                {/*</Modal>*/}

                {this.props.controlls && controlPrev}
                {this.props.controlls && controlNext}
                {this.props.navigation && navigation }
            </div>
        )
    }
}

export default Slider