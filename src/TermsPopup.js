import React from 'react';
import PropTypes from 'prop-types';
import './TermsPopup.scss';

const TermsPopup = ({ onClose }) => (
	<div className="popup-terms">
		<div className="popup-terms-wrapper">
			<button
				className="popup-terms-close reset-button"
				onClick={() => onClose('popupTerm')}
			/>
			<div className="popup-terms-text">
				<h5>Términos y condiciones</h5>
				<p>Tus datos personales serán incorporados a una base de datos de titularidad de Wal-Mart Argentina S.R.L ("WMT") y serán procesados por la WMT o sus proveedores de servicios, domiciliados en Argentina o en el exterior, para que puedas acceder al descuento de asociado en tus compras online. Podés ejercer los derechos previstos en la Ley 25.326 presentándote en el domicilio legal de WMT y completando el formulario que allí te será provisto, previa acreditación de su identidad.</p>
			</div>
		</div>
	</div>
);

export default TermsPopup;

TermsPopup.propTypes = {
	onClose: PropTypes.func.isRequired
};
