import React from 'react'
import InfoBlock from './info_block'
import Options from './options'

class CarDescription extends React.Component {

    render() {
        const car = this.props.car
        return(
            <div className='row information'>
                <div className='col'>
                    <div className='row section'>
                        <div className='col-6'>
                            <h4 className='d-inline-block'>{car.address.full}</h4>
                            <p>{car.car_carcass.name} / {car.car_type.name}</p>
                        </div>
                        <div className='col-6'>
                            <div className='row float-right'>
                                <div className='col primary'>
                                    <InfoBlock icon='icon-dashboard'
                                               desc='Пробег'
                                               value={car.mileage}/>
                                    <InfoBlock icon='icon-engine'
                                               desc='Обьем двигателя'
                                               value={car.engine  + ' л.'}/>
                                    <InfoBlock icon='icon-gas-station'
                                               desc='Топливо'
                                               value={car.fuel.name}/>
                                    <InfoBlock icon='icon-gearshift-1'
                                               desc='Трансмиссия'
                                               value={car.transmission.name}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row section'>
                        <div className='col-12'>
                            <h5>Описание</h5>
                        </div>
                        <div className='col-12 description'>
                            {car.description}
                        </div>
                    </div>

                    <div className='row section'>
                        <div className='col-12'>
                            <h5>Опции</h5>
                        </div>
                        <div className='col-12 options'>
                            <Options options={car.options}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default CarDescription