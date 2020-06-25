const SfraLoginUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Login-Show";
const SfraLogoutUrl = "https://qas01.tech-prtnr-na01.dw.demandware.net/on/demandware.store/Sites-Dev01Test-Site/default/Login-Logout";
const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite('Edq Cartridge Functional Test 3', {
	before: function() {
		return this.remote
			.setFindTimeout(500)
			.get(SfraLogoutUrl)
			.sleep(500)
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
		"SFRA Create Account - Email Validation Succed": function() {
			return this.remote
				.sleep(5000)
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
		"SFRA Create Account - Email Validation Fail": function() {
			return this.remote
				.sleep(4000)
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
		"SFRA Create Account - Phone Validation Succed": function() {
			return this.remote
				.sleep(4000)
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
					assert.equal('{"ResultCode":"3","AdditionalPhoneInfo":{"ValidatedPhoneNumber":"13524443322","CountryName":"United States of America","CountryCode":"1","OperatorName":"Sprint","PortedOperatorName":"Sprint (Sprint Corporation)","PortedCountryName":"United States","PortedCountryCode":"1","IsRoaming":"false","MCCMNC":"310120"},"Number":"13524443322","PhoneType":"Mobile","Certainty":"Verified"}', edqmetadata, "Getting a response from Phone Validation meta-data");
				})
				.end()
		},
		"SFRA Create Account - Phone Validation Fail": function() {
			return this.remote
				.sleep(4000)
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
