import React from 'react';

class Rank extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			emoji:''
		}
	}

	componentDidMount(){
		this.generateEmoji(this.props.entries)
	}

	generateEmoji = (entries) => {
		fetch(`https://nsdwl1q8kg.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
			.then (res => res.json())
			.then(data => this.setState({ emoji: data.input}))
			.catch(console.log)
	}
	render() {
		return(
			<div className='white f5'>
				<div className='center'>
					{`${this.props.name}, your current entry count is...`}
				</div>
				<div className='center f3' >
					{this.props.entries}
				</div>
				<div className='center f3' >
					{`Rank Badge: ${this.state.emoji}`}
				</div>
			</div>
		);
	}

}

export default Rank;