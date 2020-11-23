var validate = require('validate.js');

const Constraint = class {

	/**
	 * @return {object} of amount constraints
	 */
	get amount() {
		return {
			presence: true,
			type: "number",
			numericality: { greaterThanOrEqualTo: 0.5 }
		}
	}

	/**
	 * @return {object} of country constraints
	 */
	get country() {
		return {
			presence: true,
			type: "string",
			length: { is: 2 }
		}
	}
	
	/**
	 * @return {object} of currency constraints
	 */
	get currency() {
		return {
			presence: true,
			type: "string",
			length: { is: 3 }
		}
	}

	/**
	 * @return {object} of description constraints
	 */
	get description() {
		return { type: "string" }
	}

	/**
	 * @return {object} of settle constraints 
	 */
	get settle() {
		return { type: "boolean" }
	}

	/**
	 * @return {object} of oderID constraints 
	 */
	get orderId() {
		return {
			type: "string",
			length: {
				minimum: 2,
				maximum: 50
			},
			format: { pattern: "[A-Za-z0-9.\-]+" }
		}
	}

	/**
	 * @param {string} value of method type
	 * @return {object} of paymentMethod constraints
	 */
	getPaymentMethodConstraint(value) {
		return {
			presence: true,
			type: "string",
			inclusion: {
				within: [value],
				message: "should be 'card'"
			}
		}
	}

	/**
	 * @return {object} of paymentInstrument constraints
	 */
	get paymentInstrument() {
		return this.getRequired();
	}

	/**
	 * @return {object} of paymentInstrument Pan constraints
	 */
	get pan() {
		return {
			presence: true,
			type: "string",
			length: {
				minimum: 12,
				maximum: 20
			}
		}
	}

	/**
	 * @return {object} paymentInstrument expire year constraints 
	 */
	get expYear() {
		return {
			presence: true,
			type: "integer",
			numericality: {
				greaterThanOrEqualTo: new Date().getFullYear()
			}
		}
	}
	
	/**
	 * @return {object} of paymentInstrument expire month constraints 
	 */
	get expMonth() {
		return {
			presence: true,
			type: "integer",
			numericality: {
				greaterThanOrEqualTo: 1,
				lessThanOrEqualTo: 12
			}
		}
	}
		
	/**
	 * @return {object} of paymentInstrument CVC constraints 
	 */
	get cvc() {
		return {
			presence: true,
			type: "string",
			length: {
				minimum: 3,
				maximum: 4
			}
		}
	}
			
	/** 
	 * @return {object} of paymentInstrument card holder name constraints 
	 */
	get cardholder() {
		return {
			presence: true,
			type: "string",
			length: {
				maximum: 32
			}
		}
	}

	/**
	 * @return {object} of ThreeDS2 data constraints
	 */
	get threeds2Data() {
		return this.getRequired();
	}

	/**
	 * @return {object} of notification url constraints
	 */
	get notificationUrl() {
		return {
			presence: true,
			url: { allowLocal: true }
		}
	}

	/**
	 * @return {object} of BrowerInfo constraints
	 */
	get browserInfo() {
		return this.getRequired();
	}

	/**
	 * @return {object} of accept header constraints
	 */
	get acceptHeader() {
		return {
			presence: true,
			type: "string",
			length: {
				minimum: 8,
				maximum: 150
			}
		}
	}

	/**
	 * @return {object} of browser language constraints
	 */
	get browserLanguage() {
		return {
			presence: true,
			type: "string",
			length: {
				minimum: 2,
				maximum: 20,
			},
			format: { pattern: "[A-Za-z0-9\-]+" }
		}
	}

	/**
	 * @return {object} of browser screen constraints
	 */
	get screenSize() {
		return {
			presence: true,
			type: "integer",
			numericality: { greaterThanOrEqualTo: 200 }
		}
	}

	/**
	 * @return {object} of browser challenge windws constraints
	 */
	get challengeWindowSize() {
		let sizes = [
			"250x400",
			"390x400",
			"500x600",
			"600x400",
			"full-screen"
		];
		return {
			presence: true,
			type: "string",
			inclusion: {
				within: sizes,
				message: "should be one of: " + sizes
			}
		}
	}

	/**
	 * @return {object} of browser user agent constraints
	 */
	get userAgent() {
		return {
			presence: true,
			type: "string",
			length: { minimum: 3 }
		}
	}

	/**
	 * @return {object} of user desktop color depth constraints
	 */
	get colorDepth() {
		return {
			presence: true,
			type: "integer",
			numericality: { greaterThanOrEqualTo: 4 }
		}
	}

	/**
	 * @return {object} of user time zone constraints
	 */
	get timeZone() {
		return {
			presence: true,
			type: "integer"
		}
	}

	/**
	 * @return {object} of user IP address constraints
	 */
	get ipAddress() {
		return {
			type: "string",
			length: { minimum: 7 },
			format: { pattern: "[0-9.]+" }
		}
	}

	/**
	 * @return {object} of enabled constraints
	 */
	get isEnabled() {
		return { type: "boolean" }
	}

	/**
	 * @return {object} of Address constraints
	 */
	get address() {
		return {
			type: "string",
			length: { maximum: 50 }
		}
	}

	/**
	 * @return {object} of address country
	 */
	get addressCountry() {
		return {
			type: "string",
			length: {
				minimum: 2,
				maximum: 50
			}
		}
	}

	/**
	 * @return {object} of postal code constraints
	 */
	get postalCode() {
		return {
			type: "string",
			length: { maximum: 16 }
		}
	}

	/**
	 * @return {object} required: presence: true
	 */
	getRequired() {
		return { presence: true }
	}

	/**
	 * @return {object} required string constraints
	 */
	get string() {
		return {
			// presence: true,
			presence: { allowEmpty: false },
			type: "string"
		}
	}
}

module.exports = Constraint;