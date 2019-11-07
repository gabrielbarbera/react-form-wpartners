import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import './PartnersUpdateEmail.scss';

const config = { stiffness: 140, damping: 20 };


class PartnersUpdateEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingContinuar: false,
			error: false
		};
	}

	componentDidMount() {
		document.body.classList.add('hide-header-bottom');
	}

	componentWillUnmount() {
		document.body.classList.remove('hide-header-bottom');
	}

	handleContinuar = () => {
		const { isClone } = this.props;
		const { doc, emailNew, numberCard } = this.props.updateEmail;

		this.setState({ loadingContinuar: true });
		document.getElementById('ajaxBusy').classList.add('show');

		const currentParams = {
			doc,
			email: emailNew,
			numberCard
		};

	}

	render() {
		const { onClose, updateEmail, open } = this.props;

		return (

			<Motion
				defaultStyle={{ opacity: 0 }}
				style={{ opacity: open ? spring(1, config) : spring(0, config) }}
			>
				{style => (
					<div
						style={{
							opacity: style.opacity,
							display: style.opacity === 0 ? 'none' : 'flex'
						}}
						className="popup-email"
					>
						<div className="partner-form-wrapper partner-form-wrapper--email">
							<button
								className="reset-button popup-email-close"
								onClick={() => onClose('popupEmail')}
							/>
							<div className="email-text-wrapper">
								<p className="email-text-header">Esta tarjeta de asociados
									<br /> ya se encuentra registrada bajo el email:
								</p>
								<p className="email-text-emails">{updateEmail.emailOld}</p>
								<p className="email-text-center">Si continuás, tus datos se actualizarán y tu nueva dirección de email asociada será:
								</p>
								<p className="email-text-emails">{updateEmail.emailNew}</p>
								<p className="email-text-bottom">Recordá que para hacer efectivo el descuento
									<br /> tenés que ingresar a la tienda con tu dirección de email asociada.
								</p>

								{this.state.error &&
								<div className="continuar-form-warning">
									Hubo un error procesando la solicitud.
								</div>
								}

							</div>
							<div className="email-buttons-wrapper">
								<button
									className="reset-button email-button-continuar"
									onClick={this.handleContinuar}
									disabled={this.state.loadingContinuar}
								>Continuar
								</button>
								<button
									className="reset-button email-button-cancelar"
									onClick={() => onClose('popupEmail')}
								>Cancelar
								</button>
							</div>
						</div>
					</div >
				)}
			</Motion>
		);
	}
}

export default PartnersUpdateEmail;

PartnersUpdateEmail.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	updateEmail: PropTypes.shape({
		emailOld: PropTypes.string.isRequired,
		emailNew: PropTypes.string.isRequired,
		doc: PropTypes.string.isRequired,
		numberCard: PropTypes.string.isRequired
	}).isRequired,
	open: PropTypes.bool.isRequired,
	isClone: PropTypes.bool.isRequired
};
