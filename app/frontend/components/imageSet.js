import React from "react"
import Image from "./image"

class ImageSet extends React.Component {

    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            // activeImage: props.activeImage,
            // activeImage: null,
            collapsed: true
        }

        this.leftPoint = 0
        this.rightPoint = 6
        // this.handleClick = this.handleClick.bind(this)
        // this.updateBorders = this.updateBorders.bind(this)
    }

    updateBorders = () => {
        const imagesLength = this.props.images.length

        this.leftPoint = Math.max(0, this.props.activeImageIndex - 3)
        this.rightPoint = Math.min(imagesLength, this.props.activeImageIndex + 3)

        if ([0, 1, 2].includes(this.props.activeImageIndex) && this.leftPoint == 0 ) {
            this.rightPoint = 6
        }
        if ([imagesLength, imagesLength - 1, imagesLength - 2, imagesLength - 3].includes(this.props.activeImageIndex) && this.rightPoint == imagesLength) {
            this.leftPoint = imagesLength - 7
        }
        if (imagesLength <= 7) { this.leftPoint = 0; this.rightPoint = 6 }
    }

    handleClick = (id) => {
        this.setState({ activeImage: this.props.images.find(image => image.id === id) })
        // this.props.activeImage = this.props.images.find(image => image.id === id)
        this.props.changeActive(id)
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
                {imagesArray.map(image =>
                    <div key={image.id}
                         className={this.props.activeImage.id === image.id ? 'image active-thumb' : 'image'}
                         data-target="#cars-slider"
                         data-slide-to={this.props.images.map(img => img.id).indexOf(image.id)}
                    >
                        <Image id={image.id}
                               src={image.url}
                               height={100}
                               width={100}
                               key={image.id}
                               handleClick={this.handleClick}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default ImageSet