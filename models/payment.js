var validate = require('validate.js');
var Constraint = require('./constraint.js');

var method = Payment.prototype;

/**
 * Sets variables for a Payment request
 * @param {object} vars 
 */
function Payment(vars) {
	let constraint = new Constraint;
	let constraints = {
		amount: constraint.amount,
		country: constraint.country,
		currency: constraint.currency,
		description: constraint.description,
		settle: constraint.settle,
		order_id: constraint.orderId,
		payment_method: constraint.getPaymentMethodConstraint("card"),
		payment_instrument: constraint.paymentInstrument,
		"payment_instrument.pan": constraint.pan,
		"payment_instrument.exp_year": constraint.expYear,
		"payment_instrument.exp_month": constraint.expMonth,
		"payment_instrument.cvc": constraint.cvc,
		"payment_instrument.holder": constraint.cardholder,
		threeds2_data: constraint.threeds2Data,
		"threeds2_data.notification_url": constraint.notificationUrl,
		"threeds2_data.browser_info": constraint.browserInfo,
		"threeds2_data.browser_info.accept_header": constraint.acceptHeader,
		"threeds2_data.browser_info.browser_language": constraint.browserLanguage,
		"threeds2_data.browser_info.screen_width": constraint.screenSize,
		"threeds2_data.browser_info.screen_height": constraint.screenSize,
		"threeds2_data.browser_info.challenge_window_size": constraint.challengeWindowSize,
		"threeds2_data.browser_info.user_agent": constraint.userAgent,
		"threeds2_data.browser_info.color_depth": constraint.colorDepth,
		"threeds2_data.browser_info.time_zone": constraint.timeZone,
		"threeds2_data.browser_info.ip_address": constraint.ipAddress,
		"threeds2_data.browser_info.javascript_enabled": constraint.isEnabled,
		"threeds2_data.browser_info.java_enabled": constraint.isEnabled,
		"threeds2_data.billing_address.address_line1": constraint.address,
		"threeds2_data.billing_address.address_line2": constraint.address,
		"threeds2_data.billing_address.address_line3": constraint.address,
		"threeds2_data.billing_address.city": constraint.address,
		"threeds2_data.billing_address.country": constraint.addressCountry,
		"threeds2_data.billing_address.postal_code": constraint.postalCode,
		"threeds2_data.billing_address.state": constraint.address,
		"threeds2_data.billing_address.state": constraint.address,
	}
	// validate
	this.errors = validate(vars, constraints);

	this.method = 'POST';
	this.amount = vars.amount;
	this.country = vars.country;
	this.currency = vars.currency;
	this.description = vars.description;
	this.settle = vars.settle;
	this.order_id = vars.order_id;
	this.payment_method = 'card';
	this.payment_instrument = vars.payment_instrument;
	this.threeds2_data = vars.threeds2_data;
}

module.exports = Payment;