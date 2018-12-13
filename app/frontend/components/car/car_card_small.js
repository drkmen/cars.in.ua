import React from 'react';
import Image from '../base/image'

class CarCardSmall extends React.Component {

    render() {
        return(
            <div className='car-card-small'>
                <div className='image-container'>
                    <Image height='135' className='img-fluid' image={this.props.image} />
                    <div className='img-hover'>
                        <h5>
                            <span>{this.props.title}</span>
                            <span className='pull-right'>{this.props.price}</span>
                        </h5>
                        <span>{this.props.year}</span>
                        <br/>
                        <span>{this.props.transmission}, {this.props.engine}</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default CarCardSmall