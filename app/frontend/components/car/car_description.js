import React from 'react'
import InfoBlock from './info_block'

class CarDescription extends React.Component {

    render() {
        const car = this.props.car
        return(
            <div className='row information'>
                <div className='col'>
                    <div className='row'>
                        <div className='col primary'>
                            <InfoBlock icon='icon-dashboard'
                                       desc='Пробег'
                                       value={car.mileage}/>
                            <InfoBlock icon='icon-engine'
                                       desc='Обьем двигателя'
                                       value={car.engine  + ' л.'}/>
                            <InfoBlock icon='icon-gas-station'
                                       desc='Топливо'
                                       value={car.fuel.type}/>
                            <InfoBlock icon='icon-gearshift-1'
                                       desc='Трансмиссия'
                                       value={car.transmission.type}/>
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