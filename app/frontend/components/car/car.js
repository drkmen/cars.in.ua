import React from "react";
import CarImages from "./car_images";

class Car extends React.Component {

    render() {
        return(
            <div className='row car-show'>
                <div className='col-md-3 left-part'>
                    <div className='features'>

                    </div>
                </div>

                <div className='col-md-6 images-wrapper'>
                    <Car_images images={this.props.car.images}/>
                </div>

                <div className='col-md-3 right-part'>
                    <h1 className='thin'>
                        <div className='float-left'>{this.props.car.title}</div>
                        <div className='float-right'>${this.props.car.price}</div>
                        <div className='clearfix'></div>
                    </h1>
                    <div className='description'>{this.props.car.description}</div>
                </div>
            </div>
        )
    }

}

export default Car
