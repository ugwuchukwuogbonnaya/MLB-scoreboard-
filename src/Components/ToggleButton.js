/**
 * Toggle Button
 * Accepts the following properties
 * - name: string => name to represent the object, will be sent to the callback
 * - onToggle: function => the callback for when the state is toggled
 */

import React from 'react';
import classNames from 'classnames';

class ToggleButton extends React.Component{

	render(){		
		var cname = classNames("toggle",{
			selected: this.props.toggled
		});
		return (
			<button className={cname} onClick={()=>{this.props.onToggle(this.props.name,this.props.index)}}>{this.props.children}</button>
		)
	}
}

export default ToggleButton;