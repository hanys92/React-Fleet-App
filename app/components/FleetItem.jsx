var React = require('react');
import FleetAddForm from 'FleetAddForm';
import {connect} from 'react-redux';
import * as actions from 'actions';

var FleetItem = React.createClass({
	getInitialState: function(){
		return {
			showPaneInfo: false,
			showEditMenu: false,
			showDeleteMenu: false
		}
	},
	togglePaneInfo: function() {
		this.setState({
			showPaneInfo: !this.state.showPaneInfo
		})
	},
	toggleDeleteInfo: function() {
		this.setState({
			showDeleteMenu: !this.state.showDeleteMenu
		})
	},
	toggleEditMenu: function() {
		this.setState({
			showEditMenu: !this.state.showEditMenu
		})
	},
	render: function(){
		var {truck, dispatch, date} = this.props;
		return (
			<tr className={truck.sendTransportOrder ? "completed" : ""}>
				<td>{truck.forwarding}</td>
	      <td className="truck-container">
					<div>{truck.vehicle}</div>
					<div className="pane-container">
						<button  className="button nagel" data-toggle="example-dropdown-1">Dane</button>
						<div className="dropdown-pane" id="example-dropdown-1" data-dropdown data-hover="true" data-hover-pane="true">
		  			Numery: {truck.extraInfo.truckInfo}<br/>
						Dodatkowe info: {truck.extraInfo.additionalInfo}<br/>
						</div>
					</div>
				</td>
	      <td width="350px">{truck.direction}</td>
	      <td>{truck.region}</td>
				<td>{truck.freight}zł</td>
				<td className="truck-container">
					{truck.forwarder}
					<div className="pane-container">
						<button  className="button" data-toggle="example-dropdown-1">Kontakt</button>
						<div className="dropdown-pane" id="example-dropdown-1" data-dropdown data-hover="true" data-hover-pane="true">
		  			E-mail: {truck.extraInfo.email}<br/>
						TransID: {truck.extraInfo.transID}<br/>
						Telefon: {truck.extraInfo.phoneNumber}
						</div>
					</div>

				</td>
				<td width="90px">
					<div className="checkbox">
							<label>
								<input type="checkbox" name="sendOrder" checked={truck.sendTransportOrder}  onChange={() => {
									dispatch(actions.startToggleSentStatus(truck.id, truck.sendTransportOrder, date))
								}}/>
						</label>

					</div>
					</td>
				<td className="button-container"><button onClick={this.toggleEditMenu} className="button">Edytuj</button> <button className="button alert" onClick={this.toggleDeleteInfo}>Usuń</button>
					<div className={this.state.showEditMenu ? "overlay" : ""}>
						<div className="reveal" style={this.state.showEditMenu ? {display: "block"} : {display: "none"}}>
						  <FleetAddForm truck={truck} toggleEditMenu={this.toggleEditMenu}/>
						  <button onClick={this.toggleEditMenu} className="close-button">
						    <span aria-hidden="true">&times;</span>
						  </button>
						</div>
					</div>
					<div className={this.state.showDeleteMenu ? "overlay" : ""}>
						<div className="reveal delete" style={this.state.showDeleteMenu ? {display: "block"} : {display: "none"}}>
							<h5>Czy na pewno chcesz usunąć ten pojazd ?</h5>
							<div className="delete-button-container">
								<button className="button alert" onClick={() => {dispatch(actions.startRemoveTruck(truck.id, date))}}>TAK</button>
							  <button className="button secondary" onClick={this.toggleDeleteInfo}>NIE</button>
							</div>
						  <button onClick={this.toggleDeleteInfo} className="close-button" >
						    <span aria-hidden="true">&times;</span>
						  </button>
						</div>
					</div>

				</td>

			</tr>

		)
	}
});

function mapStateToProps(state) {
  return {
    date: state.date
  };
}
export default connect(mapStateToProps)(FleetItem)
