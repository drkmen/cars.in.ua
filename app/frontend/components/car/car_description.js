import React from 'react'
import InfoBlock from './info_block'
import Options from './options'

class CarDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: this.props.car.favorite
        };
    }

    toggleFavorite = () => {
        this.setState((prevState) => {
            return(
                { favorite: !prevState.favorite }
            )

        })
    }

    addToFavorite = () => {
        $.ajax({
            method: this.props.car.paths.add_favorite.method,
            url: this.props.car.paths.add_favorite.url,
            success: () => { this.toggleFavorite() }
        })
    }

    removeFromFavorite = () => {
        $.ajax({
            method: this.props.car.paths.remove_from_favorite.method,
            url: this.props.car.paths.remove_from_favorite.url,
            success: () => { this.toggleFavorite() }
        })
    }

    render() {
        const car = this.props.car
        const favorite = this.state.favorite
        const favoriteIcon = (
            <i className={favorite ? 'fa fa-star gold' : 'fa fa-star-o'}
               title={favorite ? 'Remove from favorite' : 'Add to favorite'}
               onClick={favorite ? this.removeFromFavorite : this.addToFavorite}>
            </i>
        )

        return(
            <div className='row information'>
                <div className='col'>
                    <div className='row section'>
                        <div className='col-6'>
                            <h4 className='d-inline-block'>{car.address}</h4>
                            <p>{this.props.car_type.name} / {this.props.car_carcass.name} / {car.doors} дверей</p>
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
                                               value={this.props.fuel.name}/>
                                    <InfoBlock icon='icon-gearshift-1'
                                               desc='Трансмиссия'
                                               value={this.props.transmission.name}/>
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

                    {car.options.length >= 1 && (<div className='row section'>
                        <div className='col-12'>
                            <h5>Опции</h5>
                        </div>
                        <div className='col-12 options'>
                            <Options options={car.options}/>
                        </div>
                    </div>)}

                    <p></p>
                    <div className='row section'>
                        <div className='col-12 actions text-center'>
                            {favoriteIcon}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CarDescription.defaultProps = {
    car_type: {
        name: 'DEFAULT TYPE'
    },
    car_carcass: {
        name: 'DEFAULT CARCASS'
    },
    fuel: {
        name: 'DEFAULT FUEL'
    },
    transmission: {
        name: 'DEFAULT transmission'
    }
}

export default CarDescription