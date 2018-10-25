import React from 'react'
import Image from './base/image'
import InfoBlock from "./car/info_block";

class Card extends React.Component {

    render() {
        return(
            <div className='card'>
                <div className='card-img-top'>
                    <Image
                        className='card-img-top img-fluid'
                        image={this.props.image} />
                </div>
                <div className='card-body'>
                    <a href={this.props.car_path}>
                        <h4 className='card-title thin'>
                            {this.props.title}
                            &nbsp;
                            <span className='float-right grey'> {this.props.year} </span>
                        </h4>
                    </a>

                    <div className='row'>
                        <div className='col-md-6'>
                            <InfoBlock icon='icon-gearshift-1'
                                       desc='Трансмиссия'
                                       value={this.props.transmission}/>
                        </div>
                        <div className='col-md-6'>
                            <InfoBlock icon='icon-dashboard'
                                       desc='Пробег'
                                       value={this.props.mileage}/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <InfoBlock icon='icon-engine'
                                       desc='Двигатель'
                                       value={this.props.engine}/>
                        </div>
                        <div className='col-md-6'>
                            <InfoBlock icon='icon-gas-station'
                                       desc='Топливо'
                                       value={this.props.fuel}/>
                        </div>
                    </div>

                </div>
                <div className="card-footer text-center bg-warning">
                    <h3 className='thin'>{this.props.price}</h3>
                </div>
            </div>
        )
    }

}

export default Card
