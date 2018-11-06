import React from 'react';
import CarImages from './car_images';
import CarDescription from './car_description'

class Car extends React.Component {
    render() {
        return(
            <div className='row car'>
                <div className='col-7 images-wrapper'>
                    <CarImages images={this.props.car.images}/>
                </div>
                <div className='col-5 car-description'>
                    <div className='row'>
                        <div className='col-6'>
                            <h1 className='font-300'>
                                {this.props.car.mark.name}
                                &nbsp;
                                {this.props.car.model.name}
                                <span className='grey'> {this.props.car.year} </span>
                            </h1>
                        </div>
                        <div className='col-6'>
                            <h1 className='thin float-right'>
                                <span className=''>${this.props.car.price}</span>
                            </h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <span className='grey'>Created: {this.props.car.created_at} </span>
                            <a href={this.props.edit_car_path}><i className='fa fa-pencil'></i> Edit car</a>
                            <span className='grey float-right'>
                                <i className='fa fa-eye'></i>
                                &nbsp;
                                999_999
                            </span>
                        </div>
                    </div>
                    <CarDescription car={this.props.car}/>
                </div>
            </div>
        )
    }
}

export default Car