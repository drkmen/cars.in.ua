import React from 'react'
import Image from './base/image'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ImageSet extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };

        this.leftPoint = 0;
        this.rightPoint = 6;
        this.thumbSize = 0;
    }

    componentDidMount = () => {
        this.thumbSize = ($('.active-image').width() - 13 * 5) / 14; // 13 blocks with margin 5px, 14 blocks total
        this.forceUpdate() //recalculate correct thumb sizes and rerender
    };

    updateBorders = () => {
        const imagesLength = this.props.images.length;

        this.leftPoint = Math.max(0, this.props.activeImageIndex - 3);
        this.rightPoint = Math.min(imagesLength, this.props.activeImageIndex + 3);

        if ([0, 1, 2].includes(this.props.activeImageIndex) && this.leftPoint === 0 ) {
            this.rightPoint = 6
        }

        if ([imagesLength, imagesLength - 1, imagesLength - 2, imagesLength - 3].includes(this.props.activeImageIndex) && this.rightPoint == imagesLength) {
            this.leftPoint = imagesLength - 7
        }

        if (imagesLength <= 7) { this.leftPoint = 0; this.rightPoint = 6 }
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
        // if (this.state.collapsed) {
        //     imagesArray = imagesArray.slice(this.leftPoint, this.rightPoint + 1)
        // }

        console.log(this.thumbSize);
        console.log(this.rightPoint);

        return (
            <div className='images'>
                <ReactCSSTransitionGroup
                    transitionName='fade'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

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
                </ReactCSSTransitionGroup>
                {/*<span onClick={this.collapse}>Hide</span>*/}
            </div>
        )
    }
}

export default ImageSet
