const SfraLogoutUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Login-Logout";
const SFRAProductUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/s/Dev01Test/nintendo-big-brain-academy-nintendods.html";
const SFRACheckoutStage = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Checkout-Begin";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address2")
				.clearValue()
				.type("Lbby 1")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_city")
				.clearValue()
				.type("Boston")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_states_stateCode")
				.type("Massachusetts")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_country")
				.type("United States")
				.end()
			.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
				.clearValue()
				.end()
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address2")
				.clearValue()
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_states_stateCode")
				.type("Massachusetts")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_country")
				.type("United States")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_city")
				.clearValue()
				.end()
			.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
				.clearValue()
				.end()
	}
}

registerSuite('Edq Cartridge Functional Test 2', {
	before: function() {
		return this.remote
			.setFindTimeout(10000)
			.get(SfraLogoutUrl)
			.sleep(500)
			.get(SFRAProductUrl)
			.findByCssSelector('.affirm')
			.click()
			.end()
			.sleep(1000)
			.findByCssSelector('.add-to-cart')
			.click()
			.end()
			.sleep(500)
			//.get(SFRACheckoutStage)
	},
	tests: {
		"SFRA Checkout Stage - Pro Web Address (Verification Engine / Correct Address": function() {
			return this.remote
				.sleep(4000)
				.get(SFRACheckoutStage)
				.sleep(4000)
				.then(fillInFluidAddressField())
				.sleep(5000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
				.findByName("dwfrm_shipping_shippingAddress_addressFields_postalCode")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SFRA Checkout Stage - Pro Web Address (Verification Engine / User Interation box": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.then(fillInPartialAddress())
				.sleep(5000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
				.findByCssSelector("#interaction-address--select-field")
					.clearValue()
					.type("53 state st lbby 1")
					.end()
				.sleep(2000)
				.findByXpath('//div[@class="edq-address-picklist" and text()="53 State St Lbby 1"]')
					.click()
					.end()
				.sleep(5000)
				.findByName("dwfrm_shipping_shippingAddress_addressFields_postalCode")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SFRA Checkout Stage - Global Intuitive": function() {
			return this.remote
				.sleep(4000)
				.get(SFRACheckoutStage)
				.sleep(4000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_address1')
					.clearValue()
					.type("53 state st lbby")
					.end()
				.sleep(5000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(10000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal("02109-3208", postalCode, 'Postal code value populated. Integration functioning')
				})
				.end()
		},
	}
});