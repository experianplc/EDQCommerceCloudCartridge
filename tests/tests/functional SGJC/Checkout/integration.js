const SgjcLogoutUrl = "https://qas01-tech-prtnr-na01-dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Login-Logout";
const SgjcProductUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/s/Demo_SG/nintendo-big-brain-academy-nintendods.html?cgid=electronics-gaming#start=3";
const SgjcCheckoutStage = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/COShipping-Start";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_address2")
				.clearValue()
				.type("Lbby 1")
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_city")
				.clearValue()
				.type("Boston")
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_country")
				.type("United States")
				.click()
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_states_state")
				.type("Massachusetts")
				.click()
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_phone")
				.clearValue()
				//.type("3525554433")
				.end()
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_country")
				.type("United States")
				.click()
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_states_state")
				.type("Massachusetts")
				.click()
				.end()
			.findByName("dwfrm_singleshipping_shippingAddress_addressFields_phone")
				.clearValue()
				//.type("3525554433")
				.end()
	}
}

registerSuite('Edq Cartridge Functional Test 2', {
	before: function() {
		return this.remote
			.setFindTimeout(10000)
			.get(SgjcLogoutUrl)
			.sleep(1000)
			.findByCssSelector('.ui-button-text-only')
			.click()
			.end()
			.sleep(500)
			.get(SgjcProductUrl)
			.sleep(2000)
			.findByCssSelector('#add-to-cart')
			.click()
			.end()
			//.sleep(2000)
	},
	tests: {
		"SGJC Checkout Stage - Pro Web Address (Verification Engine / Correct Address": function() {
			return this.remote
				.sleep(4000)
				.get(SgjcCheckoutStage)
				.sleep(4000)
				.then(fillInFluidAddressField())
				.sleep(4000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
				.findByName("dwfrm_singleshipping_shippingAddress_addressFields_postal")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SGJC Checkout Stage - Pro Web Address (Verification Engine / User Interation box": function() {
			return this.remote
				.sleep(2000)
				.get(SgjcCheckoutStage)
				.sleep(2000)
				.then(fillInPartialAddress())
				.sleep(4000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(5000)
				.findByCssSelector("#interaction-address--select-field")
					.type("53 state st lbby 1")
					.end()
				.sleep(2000)
				.findByXpath('//div[@class="edq-address-picklist" and text()="53 State St Lbby 1"]')
					.click()
					.end()
				.sleep(5000)
				.findByName("dwfrm_singleshipping_shippingAddress_addressFields_postal")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SGJC Checkout Stage - Global Intuitive": function() {
			return this.remote
				.get(SgjcCheckoutStage)
				.sleep(4000)
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_address1')
					.clearValue()
					.type("53 state st lbby")
					.end()
				.sleep(3000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(2000)
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_postal')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning')
				})
		},
		"SGJC Create Account - Phone Validation Succed": function() {
			return this.remote
				.sleep(2000)
				.get(SgjcCheckoutStage)
				.sleep(2000)
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_phone')
				.clearValue()
				.type("3524443322")
				.end()
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_postal')
				.click()
				.end()
				.sleep(10000)
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_phone')
					.getAttribute("edq-metadata")
				.then(function(edqmetadata) {
					assert.equal('{"ResultCode":"3","AdditionalPhoneInfo":{"ValidatedPhoneNumber":"13524443322","CountryName":"United States of America","CountryCode":"1","OperatorName":"Sprint","PortedOperatorName":"Sprint (Sprint Corporation)","PortedCountryName":"United States","PortedCountryCode":"1","IsRoaming":"false","MCCMNC":"310120"},"Number":"13524443322","PhoneType":"Mobile","Certainty":"Verified"}', edqmetadata, "Getting a response from Phone Validation meta-data");
				})
		},
		"SGJC Create Account - Phone Validation Fail": function() {
			return this.remote
				.get(SgjcCheckoutStage)
				.sleep(4000)
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_phone')
				.clearValue()
				.type("3545556644")
				.end()
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_postal')
				.click()
				.end()
				.sleep(10000)
				.findByName('dwfrm_singleshipping_shippingAddress_addressFields_phone')
					.getAttribute("edq-metadata")
				.then(function(edqmetadata) {
					assert.equal('{"ResultCode":"0","AdditionalPhoneInfo":{"ValidatedPhoneNumber":"13545556644","IsRoaming":"false"},"Number":"13545556644","PhoneType":"Provided number is Invalid","Certainty":"Unverified"}', edqmetadata, "Getting a response from Phone Validation meta-data");
				})
		},
		"SGJC Create Account - Email Validation Restricting Access": function() {
			return this.remote
				.get(SgjcCheckoutStage)
				.sleep(2000)
				.then(fillInFluidAddressField())
				//.findByName('dwfrm_singleshipping_shippingAddress_addressFields_phone')
				//.clearValue()
				//.type("3545556644")
				.end()
				.sleep(2000)
				.findByName("dwfrm_singleshipping_shippingAddress_addressFields_phone")
					.clearValue()
					.type("3525554433")
					.end()
					.sleep(500)
				.findByName("dwfrm_singleshipping_shippingAddress_addressFields_firstName")
					.clearValue()
					.type("Jose")
					.end()
					.sleep(500)
				.findByName("dwfrm_singleshipping_shippingAddress_addressFields_lastName")
					.clearValue()
					.type("3525554433")
					.end()
					.sleep(2000)
				.findByCssSelector("#form-submit")
					.click()
				.sleep(10000)
				.findByName('dwfrm_billing_billingAddress_email_emailAddress')
					.clearValue()
					.type("thisisnotanemailthisisnotanemail@gmail.com")
					.end()
					.sleep(500)
				.findByCssSelector("#form-submit")
					.click()
					.getAttribute("disabled")
					.then(function(value) {
						assert.equal(false, value, "Button is disabled restricting validation.");
					})
				.end()
		},
	}
});