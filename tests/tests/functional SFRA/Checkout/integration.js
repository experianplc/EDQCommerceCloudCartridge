const SfraLogoutUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Login-Logout";
const SFRAProductUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArch/electronics/gaming/games/ubi-soft-quick-yoga-training-nintendodsM.html?lang=en_US";
const SFRACheckoutStage = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Checkout-Begin?stage=shipping#shipping";
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

registerSuite('Experian SFRA Checkout Touchpoint', {
	beforeEach: function() {
		return this.remote
			.get(SfraLogoutUrl)
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
		"Checkout - Pro Web Address (Correct Address)": function() {
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
		"Checkout - Pro Web Address (User Interation box)": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.then(fillInPartialAddress())
				.sleep(4000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
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
		"Checkout - Pro Web Address (Modal Box Override)": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(5000)
				.execute(function() { 
					window.EdqConfig['VERIFICATION_MODAL_OVERRIDES'] = {
						modalHeader: {
							updated: "Test",
							unverified: "Test",
						},
						interactionRequired: {
							updatedAddressHeader: "Test",
							originalAddressHeader: "Test",
							useOriginalAddress: "Test",
							useUpdatedAddress: "Test",
							searchPlaceholder: "Test",
						}
					};
				})
				.sleep(2000)
				.then(fillInPartialAddress())
				.sleep(4000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
				.findByCssSelector("#edq-modal-header")
					.getProperty("innerText")
				.then(function(headerText) {
					assert.equal("Test", headerText, "Header text changed. Integration functioning");
				})
				.end()
		},
		"Checkout - Global Intuitive": function() {
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
		"Checkout - Global Intuitive (Fill country field)": function() {
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
		"Checkout - Global Intuitive (Dropdown up/down keys)": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(4000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_country')
					.click()
					.pressKeys('\uE015')
					.end()
				.sleep(2000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_address1')
					.clearValue()
					.type("53 ST")
					.end()
				.sleep(5000)
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
		"Checkout - Email Validation (Restricting Access Succeeds)": function() {
			return this.remote
				.sleep(2000)
				.get(SFRACheckoutStage)
				.sleep(2000)
				.then(fillInFluidAddressField())
				.sleep(2000)
				.findByName('dwfrm_shipping_shippingAddress_addressFields_firstName')
					.clearValue()
					.type("Jose")
					.end()
				.findByName('dwfrm_shipping_shippingAddress_addressFields_lastName')
					.clearValue()
					.type("Castillo")
					.end()
				.findByName('dwfrm_shipping_shippingAddress_addressFields_phone')
					.clearValue()
					.type("3524445566")
					.end()
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(6000)
				.findByName('dwfrm_billing_contactInfoFields_email')
					.clearValue()
					.type("noreply@gmail.com")
					.end()
				.sleep(4000)
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