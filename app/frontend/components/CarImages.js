import React from "react"
import PropTypes from "prop-types"
import ImageSet from './ImageSet'
import Image from "./image"
// import { CSSTransitionGroup } from 'react-transition-group' // ES6
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import CSSTransitionGroup from 'react-addons-css-transition-group';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class CarImages extends React.Component {

    propTypes: {
        images: PropTypes.array,
    }

    constructor(props) {
        super(props);
        this.state = {
            mainImage: this.props.images.find(image => image.main == true) || this.props.images[0],
            hasError: false
            // animate: false
        };
        this.changeMain = this.changeMain.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
        // this.mainImageSelector = $('.main-image')
    }

    componentDidMount() {
        this.mainImageSelector = $('.main-image img');
    }

    componentWillUpdate() {
        // console.log('componentWillUpdate()')
        // console.log(this.state.animate)
        // const $node = $(ReactDOM.findDOMNode(this)).find('.main-image')
        // $node.addClass('hide-left');

        // setTimeout(()=>{$node.addClass('hide-left')}, 500)
        // this.mainImageSelector.addClass(`animated ${this.state.animate}`)
        // $('.main-image').removeClass('animated slideOutRight')
    }

    componentDidUpdate() {
        // const $node = $(ReactDOM.findDOMNode(this)).find('.main-image')
        // setTimeout(()=>{$node.removeClass('hide-left')}, 500)

        // $(ReactDOM.findDOMNode(this)).css('border', '10px solid red')

        // console.log('component did update')
        // setTimeout( () => {
        //     $('.main-image img').removeClass('animated slideOutLeft')
        //     $('.main-image img').removeClass('animated slideOutRight')
        //     this.mainImageSelector.removeClass('animated slideOutLeft slideOutRight')
        // }, 400)
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
        // this.setState({animate: 'slideOutRight'});
        const prevIndex = this.activeImageIndex() - 1
        if (prevIndex > 0) {
            this.changeMain(this.props.images[prevIndex].id)
        } else {
            this.changeMain(this.props.images[this.props.images.length - 1].id)
        }
    }

    nextImage() {
        // this.setState({animate: 'slideOutLeft'});
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
                <i className="fa fa-angle-left "></i>
            </div>
        )
    }

    renderRight() {
        return (
            <div className="arrow arrow-right pointable" onClick={this.nextImage}>
                <i className="fa fa-angle-right "></i>
            </div>
        )
    }

    render() {
        return (
            <div className="car-images">
                {this.renderLeft()}

                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={100}
                    transitionLeaveTimeout={100}>

                    <div className='main-image' key={this.state.mainImage.id}>
                        <Image src={this.state.mainImage.url} className='img-fluid'/>
                    </div>
                </CSSTransitionGroup>

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

export default CarImages
