const SfraLogoutUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Login-Logout";
const SFRAProductUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/s/Dev01Test/ubi-soft-quick-yoga-training-nintendods.html";
const SFRACheckoutStage = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/en_US/Checkout-Begin?stage=shipping#shipping";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address2")
				.clearValue()
				.type("Lbby 1")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_city")
				.clearValue()
				.type("Boston")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_states_stateCode")
				.type("Massachusetts")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_country")
				.type("United States")
				.end()
				.sleep(500)
			.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
				.clearValue()
				.end()
				.sleep(500)
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address2")
				.clearValue()
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_states_stateCode")
				.type("Massachusetts")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_country")
				.type("United States")
				.end()
				.sleep(500)
			.findByName("dwfrm_shipping_shippingAddress_addressFields_city")
				.clearValue()
				.end()
				.sleep(500)
			.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
				.clearValue()
				.end()
				.sleep(500)
	}
}

registerSuite('Edq Cartridge Functional Test 2', {
	beforeEach: function() {
		return this.remote
			//.setFindTimeout(500)
			.get(SfraLogoutUrl)
			//.sleep(500)
			.get(SFRAProductUrl)
			.findByCssSelector('.affirm')
			.click()
			.end()
			.sleep(1000)
			.findByCssSelector('.add-to-cart')
			.click()
			.end()
	},
	tests: {
		"SFRA Checkout Stage - Pro Web Address (Verification Engine / Correct Address)": function() {
			return this.remote
				.sleep(2000)
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
		"SFRA Checkout Stage - Pro Web Address (Verification Engine / User Interation box)": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.then(fillInPartialAddress())
				.sleep(2000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(2000)
				.findByCssSelector("#interaction-address--select-field")
					.clearValue()
					.type("lbby 1")
					.end()
				.sleep(2000)
				.findByXpath('//div[@class="edq-address-picklist" and text()="53 State St Lbby 1"]')
					.click()
					.end()
				.sleep(4000)
				.findByName("dwfrm_shipping_shippingAddress_addressFields_postalCode")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SFRA Checkout Stage - Global Intuitive": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_address1')
					.clearValue()
					.type("53 state st lbby")
					.end()
				.sleep(7000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(3000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal("02109-3208", postalCode, 'Postal code value populated. Integration functioning')
				})
				.end()
		},
		"SFRA Fill country field - Global Intuitive": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(4000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_country')
					.click()
					.pressKeys('\uE013')
					.end()
				.sleep(2000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_address1')
					.clearValue()
					.type("53 state st lbby")
					.end()
				.sleep(3000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(10000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_country')
					.getProperty('value')
				.then(function(countryValue) {
				assert.equal("US", countryValue, 'Country value populated. Integration functioning')
				})
				.end()
		},
		"SFRA Check dropdown up/down keys - Global Intuitive": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_country')
					.click()
					.pressKeys('\uE015')
					.end()
				.sleep(2000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_address1')
					.clearValue()
					.type("53 ST")
					.end()
				.sleep(3000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.pressKeys('\uE015')
					.pressKeys('\uE015')
					.pressKeys('\uE015')
					.sleep(500)
					.pressKeys('\uE007')
					.end()
				.sleep(4000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_postalCode')
					.getProperty('value')
				.then(function(countryValue) {
				assert.equal("R5H 1C5", countryValue, 'Zip code value matching second option. Integration functioning')
				})
				.end()
		},
		"SFRA Checkout Stage - Pro Web Address (Email Validation not restricting access)": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.then(fillInFluidAddressField())
				.sleep(500)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_firstName')
					.clearValue()
					.type("Jose")
					.end()
				.sleep(500)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_lastName')
					.clearValue()
					.type("Castillo")
					.end()
				.sleep(500)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_phone')
					.clearValue()
					.type("3524445566")
					.end()
				.sleep(500)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
				.findByName('dwfrm_billing_contactInfoFields_email')
					.clearValue()
					.type("noreply@gmail.com")
					.end()
				.sleep(500)
				.findByXpath('//button[@name="submit" and @value="submit-payment"]')
					.click()
					.getAttribute("disabled")
					.then(function(value) {
						assert.equal(false, value, "Button is disabled restricting validation.");
					})
				.end()
		},
	}
});