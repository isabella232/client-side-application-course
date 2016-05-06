import React from 'react';
import ReactDOM from 'react-dom';

import MasterSchedule from 'presentational/master-schedule';

class ApplicationWrapper extends React.Component {
	render() {
		return <MasterSchedule title="A test title" />;
	}
}

ReactDOM.render(
	<ApplicationWrapper />,
	document.getElementById('app')
)
