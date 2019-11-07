import React, { Component } from 'react';

import Form from './Form';
import PartnersThanks from './PartnersThanks';
import TermsPopup from './TermsPopup';
import PartnersUpdateEmail from './PartnersUpdateEmail';
import './Partners.scss';

class Partners extends Component {
	constructor(props) {
		super(props);

		this.state = {
			updateEmail: {
				emailOld: 'emailOld',
				emailNew: 'emailNew',
				doc: '',
				numberCard: ''
			},
			isClone: false,
			popupTermOpened: false,
			popupEmail: false,
			formSubmitted: false
		};
	}

	handleEmailData = (emailData, isClone) => {
		const updateEmail = {
			emailOld: emailData.emailOld,
			emailNew: emailData.emailNew,
			doc: emailData.doc,
			numberCard: emailData.numberCard
		};
		this.setState({ updateEmail, isClone });
		this.handleOpenPopup('popupEmail');
	}

	handleOpenPopup = (str, event) => {
		if (event)
			event.preventDefault();

		if (str === 'popupTerm')
			this.setState({ popupTermOpened: true });
		if (str === 'popupEmail')
			this.setState({ popupEmail: true });
	}

	handleClosePopup = (str) => {
		if (str === 'popupTerm')
			this.setState({ popupTermOpened: false });
		if (str === 'popupEmail')
			this.setState({ popupEmail: false });
	}

	handleSubmit = () => {
		this.setState({ formSubmitted: true });
	}

	render() {
		const {
			formSubmitted,
			popupEmail,
			popupTermOpened,
			isClone
		} = this.state;
		return (
			<div className="partners">
				{!formSubmitted &&
					<Form
						onSubmit={this.handleSubmit}
						onOpenPopup={this.handleOpenPopup}
						handleEmailData={this.handleEmailData}
					/>
				}

				{formSubmitted &&
					<PartnersThanks />
				}

				{popupTermOpened &&
					<TermsPopup onClose={this.handleClosePopup} />
				}

				<PartnersUpdateEmail
					updateEmail={this.state.updateEmail}
					onClose={this.handleClosePopup}
					onSubmit={this.handleSubmit}
					open={popupEmail && !formSubmitted}
					isClone={isClone}
				/>
			</div>
		);
	}
}

export default Partners;
