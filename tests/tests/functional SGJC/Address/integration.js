const SgjcLogoutUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-SiteGenesis-Site/en_US/Login-Logout";
const SgjcLoginUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-SiteGenesis-Site/en_US/Login-Show";
const SgjsAddressAddUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-SiteGenesis-Site/en_US/Address-Add";
const SgjsAddressListUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/s/SiteGenesis/addressbook?lang=en_US";

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

registerSuite('Experian SGJC Address Touchpoint', {
	before: function() {
		return this.remote
			.get(SgjcLogoutUrl)
			.sleep(500)
			.get(SgjcLoginUrl)
			.sleep(2000)
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
				.type("Experian2020.")
				.end()
			.end()
			.findByName('dwfrm_login_login')
				.click()
				.end()
	},
	tests: {
		"Add Address - Pro Web Address (Correct Address)": function() {
			return this.remote
				.get(SgjsAddressListUrl)
				.sleep(2000)
				.findByCssSelector(".address-create")
					.click()
					.end()
				.sleep(3000)
				.then(fillInFluidAddressField())
				.sleep(4000)
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(6000)
				.findByName("dwfrm_profile_address_postal")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"Add Address - Pro Web Address (User Interation box)": function() {
			return this.remote
				.get(SgjsAddressListUrl)
				.sleep(3000)
				.findByCssSelector(".address-create")
					.click()
					.end()
				.sleep(3000)
				.then(fillInPartialAddress())
				.sleep(1000)
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
				.sleep(2000)
				.findByName("dwfrm_profile_address_postal")
					.getProperty("value")
				.then(function(postalCode) {
					assert.equal("02109-3208", postalCode, "Postal code value populated. Integration functioning");
				})
				.end()
		},
		"Add Address - Global Intuitive": function() {
			return this.remote
				.get(SgjsAddressAddUrl)
				.sleep(3000)
				.findByName('dwfrm_profile_address_address1')
					.type("53 state st lbby")
					.end()
				.sleep(6000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(6000)
				.findByName('dwfrm_profile_address_postal')
					.getProperty('value')
				.then(function(postalCode) {
				assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning')
				})
		},
		"Add Address - Pro Web Address (Address modal box closes before user interaction box)": function() {
			return this.remote
				.get(SgjsAddressListUrl)
				.sleep(2000)
				.findByCssSelector(".address-create")
					.click()
					.end()
				.sleep(3000)
				.then(fillInPartialAddress())
				.findByCssSelector("#form-submit")
					.click()
					.end()
				.sleep(2000)
				.findByCssSelector(".ui-dialog")
					.isDisplayed()
				.then(function(value) {
					assert.equal(true, value, "Modal is visible when user interaction box is visible.");
				})
				.end()
		},
		"Add Address - Global Intuitive (Geolocation)": function() {
			let addressWithoutLocation;
			let addressWithLocation;
			return this.remote
				.get(SgjsAddressAddUrl)
				.findByName('dwfrm_profile_address_address1')
					.clearValue()
					.type("53 state st")
					.end()
				.sleep(2000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(2000)
				.findByName('dwfrm_profile_address_postal')
					.getProperty('value')
					.then((val) => { addressWithLocation = val; })
					.end()
					
				.refresh()
				.execute(function() { window.EdqConfig['GLOBAL_INTUITIVE_USE_CURRENT_LOCATION'] = null; })
				.findByName('dwfrm_profile_address_address1')
					.clearValue()
					.type("53 state st")
					.end()
				.sleep(2000)
				.findByCssSelector(".edq-global-intuitive-address-suggestion")
					.click()
					.end()
				.sleep(2000)
				.findByName('dwfrm_profile_address_postal')
					.getProperty('value')
					.then((val) => { 
						addressWithoutLocation = val;
						assert.equal(true, addressWithoutLocation != addressWithLocation, "Addresses with and without location are the same");})
					.end()
		},
	}
});