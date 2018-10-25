import React from 'react'
import Image from './base/image'

class ImageSet extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };

        this.range = this.props.range || 13;
        this.halfRange = this.range / 2;
        this.leftPoint = 0;
        this.rightPoint = this.halfRange;
        this.thumbSize = 0;
    }

    componentDidMount = () => {
        this.updateThumbSizes()
    };

    updateThumbSizes = () => {
        if (this.props.thumbSize) { this.thumbSize = this.props.thumbSize }
        this.thumbSize = ($('.active-image').width() - 13 * 5) / 14; // 13 blocks with margin 5px, 14 blocks total
        if (this.thumbSize < 40) { this.thumbSize = 68 }
        this.forceUpdate() //recalculate correct thumb sizes and rerender
    }

    updateBorders = () => {
        const imagesLength = this.props.images.length;

        this.leftPoint = Math.max(0, this.props.activeImageIndex - this.halfRange);
        this.rightPoint = Math.min(imagesLength, this.props.activeImageIndex + this.halfRange);

        // do the same as range in ruby
        let startArray = Array.apply(null, {length: this.halfRange}).map(Number.call, Number);

        if (startArray.includes(this.props.activeImageIndex) && this.leftPoint === 0 ) {
            this.rightPoint = this.range
        }

        let endArray = this.props.images.slice(imagesLength - this.halfRange, imagesLength);

        if (endArray.includes(this.props.activeImageIndex) && this.rightPoint == imagesLength) {
            this.leftPoint = imagesLength - this.range
        }

        if (imagesLength <= this.range) { this.leftPoint = 0; this.rightPoint = this.range }
    };

    changeActive = (id) => {
        this.setState({ activeImage: this.props.images.find(image => image.id === id) });
        this.props.changeActive(id);
    };

    collapse = () => {
        this.setState({ collapsed: !this.state.collapsed })
    };

    render() {
        let imagesArray = this.props.images;
        if (imagesArray.length < 2) { return null }
        this.updateBorders();

        if (this.state.collapsed) {
            imagesArray = imagesArray.slice(this.leftPoint, this.rightPoint + 1)
        }

        const collapseText = this.state.collapsed ? 'Show more' : 'Hide';

        return (
            <div className='row images'>
                <div className='col-12'>
                    {imagesArray.map(image =>
                        <div key={image.id}
                             className={'image thumb ' + (this.props.activeImage.id === image.id ? 'active-thumb' : '')}
                             data-target='#cars-slider'
                             data-slide-to={this.props.images.map(img => img.id).indexOf(image.id)}
                        >
                            <Image id={image.id}
                                   image={image}
                                   height={this.thumbSize}
                                   width={this.thumbSize}
                                   key={image.id}
                                   changeActive={this.changeActive}
                            />
                        </div>
                    )}
                </div>
                <div className='col-12 text-center' onClick={this.collapse}>{collapseText}</div>
            </div>
        )
    }
}

export default ImageSet

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// <ReactCSSTransitionGroup
// transitionName='fade'
// transitionEnterTimeout={500}
// transitionLeaveTimeout={300}>
//     </ReactCSSTransitionGroup>