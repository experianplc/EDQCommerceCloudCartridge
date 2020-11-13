const SfraLoginUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Login-Show";
const SfraLogoutUrl = "https://zzhi-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-Site/en_US/Login-Logout";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite('Experian SFRA Registration Touchpoint', {
	before: function() {
		return this.remote
			.get(SfraLogoutUrl)
			.get(SfraLoginUrl)
			.findByCssSelector('.affirm')
			.click()
			.end()
	},
	beforeEach: function() {
		return this.remote
			.get(SfraLoginUrl)
	},
	tests: {
		"Registration - Email Validation Succeeds": function() {
			return this.remote
				.sleep(2000)
				.findByCssSelector("a[href='#register']")
					.click()
					.end()
				.sleep(2000)
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
				.end()
		},
		"Registration - Email Validation Fails": function() {
			return this.remote
				.sleep(2000)
				.findByCssSelector("a[href='#register']")
					.click()
					.end()
				.sleep(2000)
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
				.end()
		},
		"Registration - Phone Validation Succeeds": function() {
			return this.remote
				.sleep(2000)
				.findByCssSelector("a[href='#register']")
				.click()
				.end()
				.sleep(2000)
				.findByName('dwfrm_profile_customer_phone')
				.clearValue()
				.type("3524443322")
				.end()
				.findByName('dwfrm_profile_customer_emailconfirm')
				.click()
				.end()
				.sleep(10000)
				.findByName('dwfrm_profile_customer_phone')
					.getAttribute("edq-metadata")
				.then(function(edqmetadata) {
					assert.equal('{"ResultCode":"3","AdditionalPhoneInfo":{"ValidatedPhoneNumber":"13524443322","CountryName":"United States of America","CountryCode":"1","OperatorName":"Sprint","PortedOperatorName":"Sprint","PortedCountryName":"United States of America","PortedCountryCode":"1","IsRoaming":"false","MCCMNC":"310120"},"Number":"13524443322","PhoneType":"Mobile","Certainty":"Verified"}', edqmetadata, "Getting a response from Phone Validation meta-data");
				})
				.end()
		},
		"Registration - Phone Validation Fails": function() {
			return this.remote
				.sleep(2000)
				.findByCssSelector("a[href='#register']")
				.click()
				.end()
				.sleep(2000)
				.findByName('dwfrm_profile_customer_phone')
				.clearValue()
				.type("3545556644")
				.end()
				.findByName('dwfrm_profile_customer_emailconfirm')
				.click()
				.end()
				.sleep(10000)
				.findByName('dwfrm_profile_customer_phone')
					.getAttribute("edq-metadata")
				.then(function(edqmetadata) {
					assert.equal('{"ResultCode":"0","AdditionalPhoneInfo":{"ValidatedPhoneNumber":"13545556644","IsRoaming":"false"},"Number":"13545556644","PhoneType":"Provided number is Invalid","Certainty":"Unverified"}', edqmetadata, "Getting a response from Phone Validation meta-data");
				})
				.end()
		},
	}
});
