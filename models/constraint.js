const validate = require('validate.js');

const challengeWindowSizes = [
	"250x400",
	"390x400",
	"500x600",
	"600x400",
	"full-screen"
];
const Constraint = class {

	/**
	 * @return {function} for amount constraints
	 */
    get amount() {
		return function(value) {
			const pattern = /^\d+.\d{2}$/;
			if (pattern.test(value)) {
				return {
					presence: true,
					numericality: {
						greaterThanOrEqualTo: 0.5,
						message: "should be more than 0.5"
					}
				};
			} else {
				return {
					presence: true,
					format: {
						pattern: pattern,
						message: "should be string 0.00 format"
					}
				}
			}
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
			format: { pattern: "^[A-Za-z0-9.\-]+$" }
		}
	}

	/**
	 * @return {object} of oderID constraints 
	 */
	get paymentId() {
		return {
			presence: true,
			type: "string",
			length: { is: 36 },
			format: { pattern: "^[A-Za-z0-9.\-]+$" }
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
				message: "should be " + value
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
				maximum: 8,
			},
			format: { pattern: "^[A-Za-z\-]+$" }
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

		return {
			presence: true,
			type: "string",
			inclusion: {
				within: challengeWindowSizes,
				message: "should be one of: " + challengeWindowSizes
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
			format: { pattern: "^[0-9.]+$" }
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
				maximum: 4
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

	/**
	 * @return {object} boolean constraint
	 */
	get boolean() {
		return {
			type: "boolean"
		}
	}

	/**
	 * @return {object} wrapper for payment link constraints
	 */
    get paymentLink() {
        return {
            /**
             * @return {object} payment link expiration date constraints
             */
            expirationDate: {
                type: "date"
            },
            /**
             * @return {object} payment link description constraints
             */
            description: {
				presence: true,
                type: "string",
				length: {
					minimum: 1,
					maximum: 255
				}
            },
			/**
			 * @return {object} payment link country constraints
			 */
			get country() {
				return {
					type: "string",
					length: { is: 2 }
				}
			}
        }
    }
}

module.exports = Constraint;