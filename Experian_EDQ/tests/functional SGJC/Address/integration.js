const SgjcLogoutUrl = "https://qas01-tech-prtnr-na01-dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Login-Logout";
const SgjcLoginUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Login-Show?original=%2fon%2fdemandware%2estore%2fSites-Demo_SG-Site%2fdefault%2fAccount-Show";
//const SgjsAddressListUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Address-List";
const SgjsAddressListUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Demo_SG-Site/default/Address-Add";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
	return function() {
		return this.parent
			.findByName("dwfrm_profile_address_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_profile_address_address2")
				.clearValue()
				.type("Lbby 1")
				.end()
			.findByName("dwfrm_profile_address_city")
				.clearValue()
				.type("Boston")
				.end()
			.findByName("dwfrm_profile_address_states_state")
				.type("Massachusetts")
				.click()
				.end()
			.findByName("dwfrm_profile_address_country")
				.type("United States")
				.click()
				.end()
	}
}

function fillInPartialAddress() {
	return function() {
		return this.parent
			.findByName("dwfrm_profile_address_address1")
				.clearValue()
				.type("53 State st")
				.end()
			.findByName("dwfrm_profile_address_states_state")
				.type("Massachusetts")
				.click()
				.end()
			.findByName("dwfrm_profile_address_country")
				.type("United States")
				.click()
				.end()
	}
}

registerSuite('Edq Cartridge Functional Test', {
	before: function() {
		return this.remote
			.setFindTimeout(10000)
			.get(SgjcLogoutUrl)
			.sleep(500)
			.get(SgjcLoginUrl)
			.sleep(3000)
			.findByCssSelector('.ui-button-text-only')
			.click()
			.end()
			.sleep(2000)
			.findByCssSelector('.form-row.username.required')
				.findByCssSelector('.input-text.required')
				.type("jose.castillo@experian.com")
				.end()
			.end()
			.findByCssSelector('.form-row.password.required')
				.findByCssSelector('.input-text.required')
				.type("Experian082018.")
				.end()
			.end()
			.findByName('dwfrm_login_login')
				.click()
				.end()
	},
	tests: {
		"SGJC Add Address Stage - Pro Web Address (Verification Engine / Correct Address": function() {
			return this.remote
				.get(SgjsAddressListUrl)
				/*.sleep(2000)
				.findByCssSelector("a[href='/on/demandware.store/Sites-Demo_SG-Site/default/Address-Add']")
					.click()
					.end()*/
				.sleep(3000)
				.then(fillInFluidAddressField())
				.sleep(5000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(10000)
				.findByName("dwfrm_profile_address_postal")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SGJC Add Address Stage - Pro Web Address (Verification Engine / User Interation box": function() {
			return this.remote
				.get(SgjsAddressListUrl)
				/*.sleep(2000)
				.findByCssSelector("a[href='/on/demandware.store/Sites-Demo_SG-Site/default/Address-Add']")
					.click()
					.end()*/
				.sleep(3000)
				.then(fillInPartialAddress())
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(6000)
				.findByCssSelector("#interaction-address--select-field")
					.type("53 state st lbby 1")
					.end()
				.sleep(2000)
				.findByXpath('//div[@class="edq-address-picklist" and text()="53 State St Lbby 1"]')
					.click()
					.end()
				.sleep(2000)
				.findByName("dwfrm_profile_address_postal")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"SGJC Checkout Stage - Global Intuitive": function() {
			return this.remote
				.get(SgjsAddressListUrl)
				/*.sleep(1000)
				.findByCssSelector("a[href='/on/demandware.store/Sites-Demo_SG-Site/default/Address-Add']")
					.click()
					.end()*/
				.sleep(3000)
				.findByName('dwfrm_profile_address_address1')
					.type("53 state st lbby")
					.end()
				.sleep(3000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(2000)
				.findByName('dwfrm_profile_address_postal')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning')
				})
		},
	}
});