const SfraLogoutUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Login-Logout";
const mySFRAUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Login-Show";
const SfraAddressUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Address-AddAddress";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			.findByName("dwfrm_address_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_address_address2")
				.clearValue()
				.type("Lbby 1")
				.end()
			.findByName("dwfrm_address_country")
				.type("United States")
				.end()
			.findByName("dwfrm_address_states_stateCode")
				.type("Massachusetts")
				.end()
			.findByName("dwfrm_address_city")
				.clearValue()
				.type("Boston")
				.end()
			.findByName("dwfrm_address_postalCode")
				.clearValue()
				.end()
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			.findByName("dwfrm_address_address1")
				.clearValue()
				.type("53 State st lbby")
				.end()
			.findByName("dwfrm_address_country")
				.type("United States")
				.end()
			.findByName("dwfrm_address_states_stateCode")
				.type("Massachusetts")
				.end()
			.findByName("dwfrm_address_postalCode")
				.clearValue()
				.end()
	}
}

registerSuite('Experian SFRA Address Touchpoint', {
	before: function() {
		return this.remote
			.get(SfraLogoutUrl)
			.get(mySFRAUrl)
			.sleep(3000)
			.findByCssSelector('.affirm')
			.click()
			.end()
			.sleep(1000)
			.findByCssSelector('#login-form-email')
			.type("jose.castillo@experian.com")
			.end()
			.findByCssSelector('#login-form-password')
			.type("Experian2020.")
			.end()
			.sleep(1000)
			.findByCssSelector('.login')
				.submit()
				.end()
	},
	tests: {
		"Add Address - Pro Web Address (Correct Address)": function() {
			return this.remote
				.sleep(2000)
				.get(SfraAddressUrl)
				.sleep(3000)
				.then(fillInFluidAddressField())
				.sleep(3000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(8000)
				.findByName("dwfrm_address_postalCode")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"Add Address - Pro Web Address (User Interation box)": function() {
			return this.remote
				.sleep(2000)
				.get(SfraAddressUrl)
				.sleep(4000)
				.then(fillInPartialAddress())
				.sleep(3000)
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
				.sleep(2000)
				.findByName("dwfrm_address_postalCode")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"Add Address - Global Intuitive": function() {
			return this.remote
				.sleep(2000)
				.get(SfraAddressUrl)
				.sleep(4000)
				.findByName('dwfrm_address_address1')
					.clearValue()
					.type("53 state st lbby")
					.end()
				.sleep(7000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(3000)
				.findByName('dwfrm_address_postalCode')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal("02109-3208", postalCode, 'Postal code value populated. Integration functioning')
				})
				.end()
		},
		"Add Address - Global Intuitive (Geolocation)": function() {
			let addressWithoutLocation;
			let addressWithLocation;
			return this.remote
				.get(SfraAddressUrl)
				.sleep(2000)
				.findByName('dwfrm_address_address1')
					.clearValue()
					.type("53 state st")
					.end()
				.sleep(2000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(2000)
				.findByName('dwfrm_address_postalCode')
					.getProperty('value')
					.then((val) => { addressWithLocation = val; })
					.end()
					
				.refresh()
				.execute(function() { window.EdqConfig['GLOBAL_INTUITIVE_USE_CURRENT_LOCATION'] = null; })
				.findByName('dwfrm_address_address1')
					.clearValue()
					.type("53 state st")
					.end()
				.sleep(2000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(2000)
				.findByName('dwfrm_address_postalCode')
					.getProperty('value')
					.then((val) => { 
						addressWithoutLocation = val;
						assert.equal(true, addressWithoutLocation != addressWithLocation, "Addresses with and without location are the same");})
					.end()
		},
	}
});