import React from 'react'

class CarDescription extends React.Component {

    render() {
        const car = this.props.car
        return(
            <div className='row information'>
                <div className='col'>
                    <div className='row'>
                        <div className='col primary'>

                            <div className='info-block'>
                                <div className='icon'>
                                    <i className='icon-dashboard'/>
                                </div>
                                <div className='info text-center'>
                                    <small className='font-300'>Пробег</small>
                                    <p><b>{car.mileage}</b></p>
                                </div>
                            </div>

                            <span className='icon-engine'/>{car.engine}
                            <span className='icon-gas-station'/>{car.fuel.type}
                            <span className='icon-gearshift-1'/>{car.transmission.type}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col secondary'>
                            {car.description}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col additional'>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CarDescription