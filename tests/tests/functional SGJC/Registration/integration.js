const SgjcLogoutUrl = "https://qas01-tech-prtnr-na01-dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Login-Logout";
const SgjcRegisterUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Account-StartRegister";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			.findByCssSelector(".single-shipping")
			.findByName("dwfrm_shipping_shippingAddress_addressFields_firstName")
				.clearValue()
				.type("Jose")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_lastName")
				.clearValue()
				.type("Castillo")
				.end()
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
				.click()
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_country")
				.type("United States")
				.click()
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_phone")
				.clearValue()
				.type("3525554433")
				.end()
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			.findByCssSelector(".single-shipping")
			.findByName("dwfrm_shipping_shippingAddress_addressFields_firstName")
				.clearValue()
				.type("Jose")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_lastName")
				.clearValue()
				.type("Castillo")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_states_stateCode")
				.type("Massachusetts")
				.click()
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_country")
				.type("United States")
				.click()
				.end()
			.findByName("dwfrm_shipping_shippingAddress_addressFields_phone")
				.clearValue()
				.type("3525554433")
				.end()
	}
}

registerSuite('Edq Cartridge Functional Test 3', {
		before: function() {
			return this.remote
				.setFindTimeout(500)
				.get(SgjcLogoutUrl)
				.get(SgjcRegisterUrl)
				.sleep(2000)
				.find("css selector", ".ui-button-text-only")
					.click()
					.end()
				.catch(function(errorLog) { })
		},
		tests: {
		"SGJC Create Account - Email Validation Succed": function() {
			return this.remote
				.sleep(3000)
				.findByName('dwfrm_profile_customer_email')
				.clearValue()
				.type("jose.castillo@experian.com")
				.end()
				.findByName('dwfrm_profile_customer_emailconfirm')
				.click()
				.end()
				.sleep(10000)
				.findByName('dwfrm_profile_customer_email')
					.getAttribute("edq-metadata")
				.then(function(edqmetadata) {
					assert.equal('{"Email":"jose.castillo@experian.com","Certainty":"unknown","Message":"OK","VerboseOutput":"acceptAll"}', edqmetadata, "Getting a response from Email Validation meta-data");
				})
		},
		"SGJC Create Account - Email Validation Fail": function() {
			return this.remote
				.sleep(3000)
				.findByName('dwfrm_profile_customer_email')
				.clearValue()
				.type("thisisnotanemailthisisnotanemail@gmail.com")
				.end()
				.findByName('dwfrm_profile_customer_emailconfirm')
				.click()
				.end()
				.sleep(10000)
				.findByName('dwfrm_profile_customer_email')
					.getAttribute("edq-metadata")
				.then(function(edqmetadata) {
					assert.equal('{"Email":"thisisnotanemailthisisnotanemail@gmail.com","Certainty":"undeliverable","Message":"OK","VerboseOutput":"mailboxDoesNotExist"}', edqmetadata, "Getting a response from Email Validation meta-data");
				})
		},
	}
});