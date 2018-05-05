import React from "react";
import PropTypes from "prop-types";
import Image from "./image";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class ImageSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
        this.leftPoint = 0;
        this.rightPoint = 6;
        this.handleClick = this.handleClick.bind(this);
        this.updateBorders = this.updateBorders.bind(this);
    }

    componentWillReceiveProps() {
        // console.log($(this));
        // console.log(ReactDOM.findDOMNode(this))
        $(this).css('border', '2px solid red');
    }

    updateBorders() {
        const imagesLength = this.props.images.length;

        this.leftPoint = Math.max(0, this.props.activeImageIndex - 3);
        this.rightPoint = Math.min(imagesLength, this.props.activeImageIndex + 3);

        if ([0, 1, 2].includes(this.props.activeImageIndex) && this.leftPoint == 0 ) {
            this.rightPoint = 6
        }
        if ([imagesLength, imagesLength - 1, imagesLength - 2, imagesLength - 3].includes(this.props.activeImageIndex) && this.rightPoint == imagesLength) {
            this.leftPoint = imagesLength - 7
        }
        if (imagesLength <= 7) { this.leftPoint = 0; this.rightPoint = 6}
    }

    handleClick(e) {
        this.props.clickHandler(e)
    }

    render() {
        let imagesArray = this.props.images
        if (imagesArray.length < 2) { return null }
        this.updateBorders()
        if (this.state.collapsed) {
            imagesArray = imagesArray.slice(this.leftPoint, this.rightPoint + 1)
        }
        return (
            <div className='images'>
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >

                    {imagesArray.map(image =>
                        <div className={this.props.mainImage.id === image.id ? 'image active' : 'image'} key={image.id}>
                            <Image
                                id={image.id}
                                src={image.url}
                                height={100}
                                width={100}
                                key={image.id}
                                handleClick={this.handleClick}
                            />
                        </div>
                    )}
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default ImageSet
