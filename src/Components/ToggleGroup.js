/**
 * Contains and manages the state of the ToggleButtons
 * Takes the properties:
 * - onToggle: function => callback that sends the name of the enabled button
 */

import React from 'react';

export default class ToggleGroup extends React.Component{

	constructor(props){
		super(props);
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle(sender,index){
		this.setState({
			toggled:this.props.children.map((_,i)=>(i === index? true: false))
		});
		if(this.props.onToggle)this.props.onToggle(sender);
	}

	componentWillMount(){
		this.setState({
			toggled: this.props.children.map((_,index)=>(index === 0? true: false)) 
		});
	}


	render(){
		console.log(this.props.children);
		return (<div className="toggle-group">
			{
				React.Children.map(this.props.children,(Class,i)=>
					React.cloneElement(Class,{
						key: i,
						index: i,
						onToggle: this.onToggle,
						toggled: this.state.toggled[i]
					})					
				)
			}
		</div>);
	}

}