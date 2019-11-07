import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import './Partners.scss';
import './Form.scss';

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			termsChecked: false,
			isSubmitError: false,
			isDataWrong: false,
			apiErrorText: '',
			loading: false,
			field: {
				numberCard: '',
				email: '',
				emailRepeated: '',
				doc: ''
			},
			error: {
				email: '',
				emailRepeated: '',
				numberCard: '',
				doc: ''
			}
		};
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		const field = { ...this.state.field, [name]: value };

		if (name === 'numberCard' && value.toString().length <= 16) this.setState({ field });

		if (name === 'doc' && value.toString().length <= 8) this.setState({ field });

		if (name !== 'numberCard' && name !== 'doc') this.setState({ field });
	};

	handleCheck = (event) => {
		event.preventDefault();
		this.setState(prevState => ({ termsChecked: !prevState.termsChecked }));
	};
	validate = (value, name) => {
		switch (name) {
			case 'email':
				if (this.state.field.emailRepeated === value) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							emailRepeated: ''
						}
					}));
				}

				return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? '' : '¡Ups! Ingresá un correo electrónico válido';
			case 'emailRepeated':
				return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value === this.state.field.email
					? ''
					: '¡Ups! Este correo electrónico no coincide con el anterior';
			case 'numberCard':
				return /\d{16}/.test(value) ? '' : '¡Ups! Ingresá un número de tarjeta de asociado válido';
			case 'doc':
				return /^\d{7,8}$/.test(value) ? '' : '¡Ups! Ingresá un número de documento válido';
			default:
				return '';
		}
	};

	updateValidation = (val, name) => {
		const errorMessage = this.validate(val, name);

		this.setState(prevState => ({
			error: {
				...prevState.error,
				[name]: errorMessage
			}
		}));
	};

	handleInputBlur = (event) => {
		this.updateValidation(event.target.value, event.target.name);
	};

	handleInputFocus = (event) => {
		const { target } = event;
		const error = { ...this.state.error, [target.name]: '' };

		this.setState({ error });
	};

	parseErrorMessage = (errorMessage) => {
		let result = errorMessage;
		if (errorMessage === 'Error en validación de los datos') result = 'Por favor revisá tus datos y volvé a intentar';
		return result;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { field, termsChecked } = this.state;
		const fieldNames = ['email', 'emailRepeated', 'numberCard', 'doc'];
		const isValid = fieldNames.every(name => this.validate(field[name], name) === '');

		const { email, numberCard, doc } = this.state.field;

		// borrar warning de errores anteriores
		this.setState({
			isDataWrong: false,
			apiErrorText: ''
		});

		fieldNames.forEach(name => this.updateValidation(field[name], name));

		if (!isValid || !termsChecked) return this.setState({ isSubmitError: true });

		this.setState({ loading: true });
		document.getElementById('ajaxBusy').classList.add('show');

		const currentParams = {
			doc,
			email,
			numberCard
		};


	};

	render() {
		const { onOpenPopup } = this.props;

		const {
			email, emailRepeated, numberCard, doc
		} = this.state.field;
		const {
			error, termsChecked, isSubmitError, isDataWrong, loading
		} = this.state;

		const buttonClassName = classnames('partners-send', {
			blocked: loading
		});

		return (
			<div className="partner-form-wrapper partner-form-wrapper--main">
				<div className="form-wrapper">
					<div className="form-title">
						<div className="inline-block">
							<h3>Completá el formulario para acceder al descuento</h3>
							<p className="partners-warning-title">Todos los campos son obligatorios</p>
						</div>
					</div>
					<form className="form-partners" onSubmit={this.handleSubmit}>
						<div className="form-partners-wrapper">
							<div className="labels-wrapper">
								<Label
									title="Correo electrónico (*)"
									name="email"
									type="email"
									placeholder="nombre@email.com"
									onChange={this.handleInputChange}
									onBlur={this.handleInputBlur}
									onFocus={this.handleInputFocus}
									value={email}
									messageError={error.email}
								/>

								<Label
									title="Repetí tu correo electrónico (*)"
									name="emailRepeated"
									type="email"
									placeholder="nombre@email.com"
									onChange={this.handleInputChange}
									onBlur={this.handleInputBlur}
									onFocus={this.handleInputFocus}
									value={emailRepeated}
									messageError={error.emailRepeated}
								/>

								<Label
									title="Número de tarjeta de asociado"
									name="numberCard"
									type="number"
									placeholder="1111222233334444"
									onChange={this.handleInputChange}
									onBlur={this.handleInputBlur}
									onFocus={this.handleInputFocus}
									value={numberCard}
									messageError={error.numberCard}
								/>

								<Label
									title="Número de documento"
									name="doc"
									placeholder="30123456"
									type="number"
									onChange={this.handleInputChange}
									onBlur={this.handleInputBlur}
									onFocus={this.handleInputFocus}
									value={doc}
									messageError={error.doc}
								/>
								<p className="email-footnote">(*) Recordá que el beneficio se aplicará sobre este correo electrónico únicamente</p>

								{Boolean(this.state.error.doc) && (
									<div>
										<div className="center warning-dni">
											<span className="partner-form-warning  warning-dni bold">
												Tenés que ingresar un DNI registrado. Ante cualquier duda, comunicate con Servicio al Cliente.
											</span>
										</div>
										<div className="center">
											<span className="partner-form-warning">
												De persistir el problema, contactate con soporteasociados@walmart.com.ar
											</span>
										</div>
									</div>
								)}
							</div>

							<div className="center">
								<div>
									<button
										className={`terms-button ${!termsChecked ? 'error' : ''}`}
										onClick={event => onOpenPopup('popupTerm', event)}
									>
										Ver términos y condiciones
									</button>
								</div>
								<div>
									<button
										className={`reset-button terms-wrapper
											${isSubmitError && !termsChecked ? 'error' : ''}`}
										onClick={this.handleCheck}
									>
										<div className="terms-check">{this.state.termsChecked && <div className="checkmark" />}</div>
										<span className="terms-button">Acepto los términos y condiciones</span>
									</button>
								</div>
							</div>

							<p className="api-error">{this.state.apiErrorText}</p>

							{isDataWrong && <ErrorMessage />}
						</div>

						<div className="section-partners-send center">
							<button type="submit" value="Enviar" className={buttonClassName} id="partners-send" disabled={loading}>
								{' '}
								Enviar
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Form;

Form.propTypes = {
	onOpenPopup: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleEmailData: PropTypes.func.isRequired
};
