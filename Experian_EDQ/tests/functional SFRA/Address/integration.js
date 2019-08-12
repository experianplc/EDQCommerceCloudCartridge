const SfraLogoutUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Login-Logout";
const mySFRAUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Login-Show";
const SfraAddressUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Address-AddAddress";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			/*.findByName("dwfrm_address_addressId")
				.clearValue()
				.type("TestAddress1")
				.end()
			.findByName("dwfrm_address_firstName")
				.clearValue()
				.type("Jose")
				.end()
			.findByName("dwfrm_address_lastName")
				.clearValue()
				.type("Castillo")
				.end()*/
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
				//.click()
				.end()
			.findByName("dwfrm_address_states_stateCode")
				.type("Massachusetts")
				//.click()
				.end()
			.findByName("dwfrm_address_city")
				.clearValue()
				.type("Boston")
				.end()
			.findByName("dwfrm_address_postalCode")
				.clearValue()
				.end()
			/*.findByName("dwfrm_address_phone")
				.clearValue()
				.type("3525554433")
				.end()*/
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			/*.findByName("dwfrm_address_addressId")
				.clearValue()
				.type("TestAddress2")
				.end()
			.findByName("dwfrm_address_firstName")
				.clearValue()
				.type("Jose")
				.end()
			.findByName("dwfrm_address_lastName")
				.clearValue()
				.type("Castillo")
				.end()*/
			.findByName("dwfrm_address_address1")
				.clearValue()
				.type("53 State st lbby")
				.sleep(500)
				//.pressKeys('ESCAPE')
				//.pressKeys('NULL')
				.end()
			.findByName("dwfrm_address_country")
				.type("United States")
				//.click()
				.end()
			.findByName("dwfrm_address_states_stateCode")
				.type("Massachusetts")
				//.click()
				.end()
			.findByName("dwfrm_address_postalCode")
				.clearValue()
				.end()
			/*.findByName("dwfrm_address_phone")
				.clearValue()
				.type("3525554433")
				.end()*/
	}
}

registerSuite('Edq Cartridge Functional Test', {
	before: function() {
		return this.remote
			.setFindTimeout(10000)
			.get(SfraLogoutUrl)
			.sleep(500)
			.get(mySFRAUrl)
			.sleep(3000)
			.findByCssSelector('.affirm')
			.click()
			.end()
			.findByCssSelector('#login-form-email')
			.type("jose.castillo@experian.com")
			.end()
			.findByCssSelector('#login-form-password')
			.type("Experian082018.")
			.end()
			.findByCssSelector('.login')
				.submit()
				.end()
	},
	tests: {
		"SFRA Add Address Stage - Pro Web Address (Verification Engine / Correct Address": function() {
			return this.remote
				.get(SfraAddressUrl)
				.sleep(4000)
				.then(fillInFluidAddressField())
				.sleep(5000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(10000)
				.findByName("dwfrm_address_postalCode")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SFRA Add Address Stage - Pro Web Address (Verification Engine / User Interation box": function() {
			return this.remote
				.get(SfraAddressUrl)
				.sleep(4000)
				.then(fillInPartialAddress())
				.sleep(5000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(8000)
				.findByCssSelector("#interaction-address--select-field")
					.type("53 state st lbby 1")
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
		"SFRA Add Address Stage - Global Intuitive": function() {
			return this.remote
				.get(SfraAddressUrl)
				.sleep(4000)
				.findByName('dwfrm_address_address1')
					.clearValue()
					.type("53 state st lbby")
					.end()
				.sleep(3000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(5000)
				.findByName('dwfrm_address_postalCode')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal("02109-3208", postalCode, 'Postal code value populated. Integration functioning')
				})
				.end()
		},
	}
});