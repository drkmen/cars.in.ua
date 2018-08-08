import React from 'react';
import CarImages from './car_images';
import CarDescription from './car_description'

class Carr extends React.Component {
    render() {
        return(
            <div className='row car'>
                <div className='col-7 images-wrapper'>
                    <CarImages images={this.props.car.images}/>
                </div>
                <div className='col-5'>
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
                    <CarDescription car={this.props.car}></CarDescription>
                </div>
            </div>
        )
    }
}

export default Carr