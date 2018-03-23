class Card extends React.Component {

    hoverHandler() {
        console.log('PRIVETYLI')
        // $(ReactDOM.findDOMNode(this)).find('.card-img-top').addClass('animated zoomOut')
    }

    render() {
        return(
            <div onMouseEnter={this.hoverHandler}>
                <div className='card-img'>
                    <img className='card-img-top' src={this.props.image}></img>
                </div>
                <div className='card-body'>
                    <a href={this.props.car_path}>
                        <h4 className='card-title thin'>{this.props.title}</h4>
                    </a>
                    <img src='/assets/icons/gearshift.svg' height='17' width='17'/>{this.props.transmission}
                    <img src='/assets/icons/dashboard.svg' height='17' width='17'/>{this.props.mileage}
                    <img src='/assets/icons/engine.svg' height='17' width='17'/>{this.props.mileage}
                    <img src='/assets/icons/gas-station.svg' height='17' width='17'/>{this.props.mileage}
                </div>
                <div className="card-footer text-center">
                    <h3 className='thin'>{this.props.price}</h3>
                </div>
            </div>
        )
    }

}


{/*<div className='col-md-6 text-center'>{this.props.price}</div>*/}
{/*<div className='col-md-6'>*/}
    {/*<button className='btn btn-info'>more</button>*/}
{/*</div>*/}
