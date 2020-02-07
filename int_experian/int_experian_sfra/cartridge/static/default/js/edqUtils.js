/*global EDQ*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/* exported edqSetEmailValidationConfiguration edqSetPhoneValidationConfiguration setCheckoutFormEvents edqValidateAddressCallBack edqCheckoutPageWorkflows */
var vDefaultCountry, 
	edqAddressLine1Id,
	edqAddressLine2Id,
	edqCityLineId,
	edqPostalLineId,
	edqStateLineId,
	edqCountryLineId,
	edqEmailLineSelector,
	edqPhoneLineSelectors = [],
	edqCurrentSubmitButtonSelector,
	edqEmailEnable,
	edqPhoneEnable,
	edqValidateEmail,
	edqValidatePhone,
	edqAuthorizationToken,
	edqProWebAddressLayout,
	edqDataSetUsage,
	edqDataSetCode,
	edqProWebCallbackValidation,
	edqCustomCallbackName,
	edqGlobalIntuitiveUnicornJsPath,
	reloadGIjs = true;
var inputSelector = document.querySelectorAll("input[id]");
var buttonSelector = document.querySelectorAll("button[name]");
window.EdqConfig = window.EdqConfig || {};
/** Demandware uses ISO-2 codes for countries. This dictionary is intended to capture ISO-2 codes into ISO-3 codes for Pegasus/Unicorn libraries. **/
var countryDict = [];
countryDict.push({ key: "AF", value: "AFG" },
	{ key: "AX", value: "ALA" },
	{ key: "AL", value: "ALB" },
	{ key: "DZ", value: "DZA" },
	{ key: "AS", value: "ASM" },
	{ key: "AD", value: "AND" },
	{ key: "AO", value: "AGO" },
	{ key: "AI", value: "AIA" },
	{ key: "AQ", value: "ATA" },
	{ key: "AG", value: "ATG" },
	{ key: "AR", value: "ARG" },
	{ key: "AM", value: "ARM" },
	{ key: "AW", value: "ABW" },
	{ key: "AU", value: "AUS" },
	{ key: "AT", value: "AUT" },
	{ key: "AZ", value: "AZE" },
	{ key: "BS", value: "BHS" },
	{ key: "BH", value: "BHR" },
	{ key: "BD", value: "BGD" },
	{ key: "BB", value: "BRB" },
	{ key: "BY", value: "BLR" },
	{ key: "BE", value: "BEL" },
	{ key: "BZ", value: "BLZ" },
	{ key: "BJ", value: "BEN" },
	{ key: "BM", value: "BMU" },
	{ key: "BT", value: "BTN" },
	{ key: "BO", value: "BOL" },
	{ key: "BA", value: "BIH" },
	{ key: "BW", value: "BWA" },
	{ key: "BV", value: "BVT" },
	{ key: "BR", value: "BRA" },
	{ key: "VG", value: "VGB" },
	{ key: "IO", value: "IOT" },
	{ key: "BN", value: "BRN" },
	{ key: "BG", value: "BGR" },
	{ key: "BF", value: "BFA" },
	{ key: "BI", value: "BDI" },
	{ key: "KH", value: "KHM" },
	{ key: "CM", value: "CMR" },
	{ key: "CA", value: "CAN" },
	{ key: "CV", value: "CPV" },
	{ key: "KY", value: "CYM" },
	{ key: "CF", value: "CAF" },
	{ key: "TD", value: "TCD" },
	{ key: "CL", value: "CHL" },
	{ key: "CN", value: "CHN" },
	{ key: "HK", value: "HKG" },
	{ key: "MO", value: "MAC" },
	{ key: "CX", value: "CXR" },
	{ key: "CC", value: "CCK" },
	{ key: "CO", value: "COL" },
	{ key: "KM", value: "COM" },
	{ key: "CG", value: "COG" },
	{ key: "CD", value: "COD" },
	{ key: "CK", value: "COK" },
	{ key: "CR", value: "CRI" },
	{ key: "CI", value: "CIV" },
	{ key: "HR", value: "HRV" },
	{ key: "CU", value: "CUB" },
	{ key: "CY", value: "CYP" },
	{ key: "CZ", value: "CZE" },
	{ key: "DK", value: "DNK" },
	{ key: "DJ", value: "DJI" },
	{ key: "DM", value: "DMA" },
	{ key: "DO", value: "DOM" },
	{ key: "EC", value: "ECU" },
	{ key: "EG", value: "EGY" },
	{ key: "SV", value: "SLV" },
	{ key: "GQ", value: "GNQ" },
	{ key: "ER", value: "ERI" },
	{ key: "EE", value: "EST" },
	{ key: "ET", value: "ETH" },
	{ key: "FK", value: "FLK" },
	{ key: "FO", value: "FRO" },
	{ key: "FJ", value: "FJI" },
	{ key: "FI", value: "FIN" },
	{ key: "FR", value: "FRA" },
	{ key: "GF", value: "GUF" },
	{ key: "PF", value: "PYF" },
	{ key: "TF", value: "ATF" },
	{ key: "GA", value: "GAB" },
	{ key: "GM", value: "GMB" },
	{ key: "GE", value: "GEO" },
	{ key: "DE", value: "DEU" },
	{ key: "GH", value: "GHA" },
	{ key: "GI", value: "GIB" },
	{ key: "GR", value: "GRC" },
	{ key: "GL", value: "GRL" },
	{ key: "GD", value: "GRD" },
	{ key: "GP", value: "GLP" },
	{ key: "GU", value: "GUM" },
	{ key: "GT", value: "GTM" },
	{ key: "GG", value: "GGY" },
	{ key: "GN", value: "GIN" },
	{ key: "GW", value: "GNB" },
	{ key: "GY", value: "GUY" },
	{ key: "HT", value: "HTI" },
	{ key: "HM", value: "HMD" },
	{ key: "VA", value: "VAT" },
	{ key: "HN", value: "HND" },
	{ key: "HU", value: "HUN" },
	{ key: "IS", value: "ISL" },
	{ key: "IN", value: "IND" },
	{ key: "ID", value: "IDN" },
	{ key: "IR", value: "IRN" },
	{ key: "IQ", value: "IRQ" },
	{ key: "IE", value: "IRL" },
	{ key: "IM", value: "IMN" },
	{ key: "IL", value: "ISR" },
	{ key: "IT", value: "ITA" },
	{ key: "JM", value: "JAM" },
	{ key: "JP", value: "JPN" },
	{ key: "JE", value: "JEY" },
	{ key: "JO", value: "JOR" },
	{ key: "KZ", value: "KAZ" },
	{ key: "KE", value: "KEN" },
	{ key: "KI", value: "KIR" },
	{ key: "KP", value: "PRK" },
	{ key: "KR", value: "KOR" },
	{ key: "KW", value: "KWT" },
	{ key: "KG", value: "KGZ" },
	{ key: "LA", value: "LAO" },
	{ key: "LV", value: "LVA" },
	{ key: "LB", value: "LBN" },
	{ key: "LS", value: "LSO" },
	{ key: "LR", value: "LBR" },
	{ key: "LY", value: "LBY" },
	{ key: "LI", value: "LIE" },
	{ key: "LT", value: "LTU" },
	{ key: "LU", value: "LUX" },
	{ key: "MK", value: "MKD" },
	{ key: "MG", value: "MDG" },
	{ key: "MW", value: "MWI" },
	{ key: "MY", value: "MYS" },
	{ key: "MV", value: "MDV" },
	{ key: "ML", value: "MLI" },
	{ key: "MT", value: "MLT" },
	{ key: "MH", value: "MHL" },
	{ key: "MQ", value: "MTQ" },
	{ key: "MR", value: "MRT" },
	{ key: "MU", value: "MUS" },
	{ key: "YT", value: "MYT" },
	{ key: "MX", value: "MEX" },
	{ key: "FM", value: "FSM" },
	{ key: "MD", value: "MDA" },
	{ key: "MC", value: "MCO" },
	{ key: "MN", value: "MNG" },
	{ key: "ME", value: "MNE" },
	{ key: "MS", value: "MSR" },
	{ key: "MA", value: "MAR" },
	{ key: "MZ", value: "MOZ" },
	{ key: "MM", value: "MMR" },
	{ key: "NA", value: "NAM" },
	{ key: "NR", value: "NRU" },
	{ key: "NP", value: "NPL" },
	{ key: "NL", value: "NLD" },
	{ key: "AN", value: "ANT" },
	{ key: "NC", value: "NCL" },
	{ key: "NZ", value: "NZL" },
	{ key: "NI", value: "NIC" },
	{ key: "NE", value: "NER" },
	{ key: "NG", value: "NGA" },
	{ key: "NU", value: "NIU" },
	{ key: "NF", value: "NFK" },
	{ key: "MP", value: "MNP" },
	{ key: "NO", value: "NOR" },
	{ key: "OM", value: "OMN" },
	{ key: "PK", value: "PAK" },
	{ key: "PW", value: "PLW" },
	{ key: "PS", value: "PSE" },
	{ key: "PA", value: "PAN" },
	{ key: "PG", value: "PNG" },
	{ key: "PY", value: "PRY" },
	{ key: "PE", value: "PER" },
	{ key: "PH", value: "PHL" },
	{ key: "PN", value: "PCN" },
	{ key: "PL", value: "POL" },
	{ key: "PT", value: "PRT" },
	{ key: "PR", value: "PRI" },
	{ key: "QA", value: "QAT" },
	{ key: "RE", value: "REU" },
	{ key: "RO", value: "ROU" },
	{ key: "RU", value: "RUS" },
	{ key: "RW", value: "RWA" },
	{ key: "BL", value: "BLM" },
	{ key: "SH", value: "SHN" },
	{ key: "KN", value: "KNA" },
	{ key: "LC", value: "LCA" },
	{ key: "MF", value: "MAF" },
	{ key: "PM", value: "SPM" },
	{ key: "VC", value: "VCT" },
	{ key: "WS", value: "WSM" },
	{ key: "SM", value: "SMR" },
	{ key: "ST", value: "STP" },
	{ key: "SA", value: "SAU" },
	{ key: "SN", value: "SEN" },
	{ key: "RS", value: "SRB" },
	{ key: "SC", value: "SYC" },
	{ key: "SL", value: "SLE" },
	{ key: "SG", value: "SGP" },
	{ key: "SK", value: "SVK" },
	{ key: "SI", value: "SVN" },
	{ key: "SB", value: "SLB" },
	{ key: "SO", value: "SOM" },
	{ key: "ZA", value: "ZAF" },
	{ key: "GS", value: "SGS" },
	{ key: "SS", value: "SSD" },
	{ key: "ES", value: "ESP" },
	{ key: "LK", value: "LKA" },
	{ key: "SD", value: "SDN" },
	{ key: "SR", value: "SUR" },
	{ key: "SJ", value: "SJM" },
	{ key: "SZ", value: "SWZ" },
	{ key: "SE", value: "SWE" },
	{ key: "CH", value: "CHE" },
	{ key: "SY", value: "SYR" },
	{ key: "TW", value: "TWN" },
	{ key: "TJ", value: "TJK" },
	{ key: "TZ", value: "TZA" },
	{ key: "TH", value: "THA" },
	{ key: "TL", value: "TLS" },
	{ key: "TG", value: "TGO" },
	{ key: "TK", value: "TKL" },
	{ key: "TO", value: "TON" },
	{ key: "TT", value: "TTO" },
	{ key: "TN", value: "TUN" },
	{ key: "TR", value: "TUR" },
	{ key: "TM", value: "TKM" },
	{ key: "TC", value: "TCA" },
	{ key: "TV", value: "TUV" },
	{ key: "UG", value: "UGA" },
	{ key: "UA", value: "UKR" },
	{ key: "AE", value: "ARE" },
	{ key: "GB", value: "GBR" },
	{ key: "US", value: "USA" },
	{ key: "UM", value: "UMI" },
	{ key: "UY", value: "URY" },
	{ key: "UZ", value: "UZB" },
	{ key: "VU", value: "VUT" },
	{ key: "VE", value: "VEN" },
	{ key: "VN", value: "VNM" },
	{ key: "VI", value: "VIR" },
	{ key: "WF", value: "WLF" },
	{ key: "EH", value: "ESH" },
	{ key: "YE", value: "YEM" },
	{ key: "ZM", value: "ZMB" },
	{ key: "ZW", value: "ZWE" });
function countryAlpha3(incomingCountryIso2) { 
	var iso2ToIso3CountryDict;
	countryDict.forEach((val) => iso2ToIso3CountryDict = (incomingCountryIso2.match(val.key)) ? val.value : iso2ToIso3CountryDict);
	return iso2ToIso3CountryDict || vDefaultCountry;
}
function countryAlpha2(incomingCountryIso3) {
	return countryDict.filter(function(countryKeyAndValue) {
		return countryKeyAndValue.value === incomingCountryIso3;
	})[0] || null;
}
/*** Set values for EDQ variables ***/
function setEdqInputSelectors(stageContentLocation = "") {
	/** In SFRA the checkout web page contains both billing and shipping address input fields in a single page controlled by JavaScripts to hide/show elements.
	* The stageContentLocation variable is intended to specify the stage(billing/shipping) of the checkout web page to set the proper input address fields 
	* that we require to set them for billing or shipping address fields, since is they're set in the same web page we need to change its value to use them in the next step.*/
	if (stageContentLocation === "shipping") {
		edqAddressLine1Id = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_address1]");
		edqAddressLine2Id = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_address2]");
		edqCityLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_city]");
		edqPostalLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_postalCode]");
		edqStateLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_states_stateCode]");
		edqCountryLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_country]");
	} else if (stageContentLocation === "billing") {
		edqAddressLine1Id = document.querySelector("#billingAddressOne");
		edqAddressLine2Id = document.querySelector("#billingAddressTwo");
		edqCityLineId = document.querySelector("#billingAddressCity");
		edqPostalLineId = document.querySelector("#billingZipCode");
		edqStateLineId = document.querySelector("#billingState");
		edqCountryLineId = document.querySelector("#billingCountry");
	} else {
		edqAddressLine1Id = document.querySelector("#address1");
		edqAddressLine2Id = document.querySelector("#address2");
		edqCityLineId = document.querySelector("#city");
		edqPostalLineId = document.querySelector("#zipCode");
		edqStateLineId = document.querySelector("#state");
		edqCountryLineId = document.querySelector("#country");
	}
	for (var i = 0; i < inputSelector.length; i++) {
		if (inputSelector[i].id.toLowerCase().match(/phone/)) { edqPhoneLineSelectors.push(inputSelector[i]); }
		edqEmailLineSelector = ((inputSelector[i].id == "registration-form-email") || (inputSelector[i].id == "email")) ? inputSelector[i] : edqEmailLineSelector;
	}
}
for (var i = 0; i < buttonSelector.length; i++) {
	/** In SFRA the checkout web page contains both billing and shipping process so we have to set the button we need so 
	* this part is intended to find out the submit button for the checkout web page; in this page there are 3 submit buttons 
	* with the label name=submit; so for this page the only way to distinguish them is for the label value; this case is just for initial load.*/
	if (window.location.href.toLowerCase().match(/checkout/)) {
		if (buttonSelector[i].hasAttribute("value")) {
			edqCurrentSubmitButtonSelector = (buttonSelector[i].value.toLowerCase().match(/shipping/)) ? buttonSelector[i] : edqCurrentSubmitButtonSelector;
			buttonSelector[i].addEventListener("mouseover", edqEmailPhoneValidationCallback);
		}
	} else {
		edqCurrentSubmitButtonSelector = (buttonSelector[i].name.toLowerCase().match(/save/)) ? buttonSelector[i] : edqCurrentSubmitButtonSelector;
		buttonSelector[i].addEventListener("mouseover", edqEmailPhoneValidationCallback);
	}
}
/**
* This window.location is intended to specify the input address fields that we require when we get to the checkout web page for initial load.
*/
if (window.location.href.toLowerCase().match(/checkout/)) {
	setEdqInputSelectors("shipping");
} else {
	setEdqInputSelectors();
}
if (edqEmailLineSelector) { edqEmailLineSelector.addEventListener("mouseover", function() {enableButtonDisable(edqCurrentSubmitButtonSelector, false);}); }
if (edqPhoneLineSelectors) { edqPhoneLineSelectors.forEach(phoneSelector => { phoneSelector.addEventListener("mouseover", function() {enableButtonDisable(edqCurrentSubmitButtonSelector, false);}); }); }
function edqEmailPhoneValidationCallback() {
	if ((edqEmailEnable) && (edqEmailLineSelector)) { edqEmailValidationCallback(); }
	if ((edqPhoneEnable) && (edqPhoneLineSelectors)) { edqPhoneValidationCallback(); }
}
/**
* In the Business Manager there's an option that sets if the email and/or email will allow the user to prevent the 
* user going to the next page; so this function will set the button an event listener to catch the result if the 
* configuration is set to true; button is disabled when the mouse is over the button and disabled when you focus 
* on the email or phone fields. */
function enableButtonDisable(buttonToDisable, buttonStatus) {
	buttonToDisable.disabled = buttonStatus;
	if (document.getElementById("form-submit")) { document.getElementById("form-submit").disabled = buttonStatus; }
}
function edqPhoneValidationCallback() {
	/** TASK:101729 Allow users to continue with invalid phone; 
	* based on the Business Manager configuration we can set if we want to prevent the user to go through with an invalid phone. */
	if (edqValidatePhone) {
		edqPhoneLineSelectors.forEach(phoneSelector => {
			if (phoneSelector.hasAttribute("edq-metadata")) {
				var edqPhoneResponse = JSON.parse(phoneSelector.getAttribute("edq-metadata"));
				if (edqPhoneResponse["Certainty"] == "Verified") {
					enableButtonDisable(edqCurrentSubmitButtonSelector, false);
				} else {
					enableButtonDisable(edqCurrentSubmitButtonSelector, true);
				}
			}
		});
	}
}
function edqEmailValidationCallback() {
	/** TASK:101729 Allow users to continue with invalid email; 
	* based on the Business Manager configuration we can set if we want to prevent the user to go through with an invalid phone. */
	if (edqValidateEmail) {
		if (edqEmailLineSelector.hasAttribute("edq-metadata")) {
			var edqEmailResponse = JSON.parse(edqEmailLineSelector.getAttribute("edq-metadata"));
			if ((edqEmailResponse["Certainty"] == "verified") || (edqEmailResponse["Certainty"] == "unknown")) {
				enableButtonDisable(edqCurrentSubmitButtonSelector, false);
			} else {
				enableButtonDisable(edqCurrentSubmitButtonSelector, true);
			} 
		}
	}
}
/**
* Email validation
* Sets the configuration to use Email Validate
*/
/*eslint no-unused-vars: "error"*/
function edqSetEmailValidationConfiguration() {
	window.EdqConfig.EMAIL_VALIDATE_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.EMAIL_TIMEOUT=15000;
	window.EdqConfig.EMAIL_ELEMENTS=[
		edqEmailLineSelector
	];
}
/**
* Phone validation
* Sets the configuration to use Global Phone Validate
*/
function edqSetPhoneValidationConfiguration() {
	window.EdqConfig.GLOBAL_PHONE_VALIDATE_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.PHONE_TIMEOUT=3500;
	window.EdqConfig.REVERSE_PHONE_APPEND_MAPPINGS= [];
	window.EdqConfig.PHONE_ELEMENTS=edqPhoneLineSelectors;
}
/**
* Global Intuitive
* Sets the configuration to use Global Intuitive
*/
function edqSetGlobalIntuitiveConfiguration() {
	var globalIntuitiveIsoCountry = vDefaultCountry;
	if (edqCountryLineId != null) {
		globalIntuitiveIsoCountry = edqCountryLineId.value;
	}
	window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY=countryAlpha3(globalIntuitiveIsoCountry);
	window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= edqAddressLine1Id;
	/**
	* Feature 118583
	* Configuration option to include Data Sets for Global Intuitive*/
	if (edqDataSetUsage) window.EdqConfig.GLOBAL_INTUITIVE_DATASET=edqDataSetCode;
	window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
		{
			field: edqAddressLine1Id,
			elements: ["address.addressLine1"]
		},
		{
			field: edqAddressLine2Id,
			elements: ["address.addressLine2"]
		},
		{
			field: edqCityLineId,
			elements: ["address.locality"]
		},
		{
			field: edqStateLineId,
			elements: ["address.province"]
		},
		{
			field: edqPostalLineId,
			elements: ["address.postalCode"]
		},
	];
}
function setCountryField() {
	setTimeout(function() {
		if (edqCountryLineId !== null && edqCountryLineId.value === "" && edqAddressLine1Id.hasAttribute("edq-metadata")) {
			edqCountryLineId.value = countryAlpha2(window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY)["key"];
		}
	}, 5000);
}
/** Browser autofill triggers Global Intuitive Suggestion box and proceed to the billing stage the suggestion address box doesn't dissapear.
* For more information see Bug #142988
**/
function removeGlobalIntuitiveSuggestionBox() {
	if ((document.querySelector(".edq-global-intuitive-address-suggestions")) 
			&& (document.querySelector(".edq-global-intuitive-address-suggestions").style.display == "block")) {
		var edqGlobalIntuitiveSuggestionBox = document.querySelector(".edq-global-intuitive-address-suggestions");
		edqGlobalIntuitiveSuggestionBox.style.display = "none";
	}
}
/** In SFRA the checkout web page contains both billing and shipping in a single page controlled by JavaScript to hide/show elements. 
* The setCheckoutFormEvents is intended to set all input address fields variables depending on the stage we are(billing/shipping); 
* the selectors choose by this function just appear once the stage is completed; once we click on the selector the other will 
* be going to the stage that we're selecting and the will continue the regular workflow.*/
function addEventOnElement(selector, event, fn) {
	const element = document.querySelector(selector);
	if (!element) { return; }
	element.addEventListener(event, fn);
}
function setCheckoutFormEvents() {
	if (edqCountryLineId != null)
		if (edqCountryLineId.value === "") { edqCountryLineId.value = "US"; }
	/**
	* Autofill after selecting a suggested address is broken.
	* By doing this we can refresh the configuration for Global Intuitive in Checkout stage; we can toogle between 
	* shipping and billing address elements; since the webpage doesn't reload, all elements are controlled by js and css; 
	* the listeners are set to refresh the configuration for Global Intuitive.
	* For more information see Bug #125898 */
	const setEventsForRegistration = function() { setEventsForListeners(); };
	const setEventsForBilling = function() { 
		setEventsForListeners("billing");
		if (reloadGIjs) {
			/** Autofill not working on billing address at all
			* By doing this in the checkout stage for SFRA we can remove the global-intuitive-unicorn.js in order to force to reload all the content with 
			* the new parameters that we're including, since the webpage doesn't do a refresh items we're not changing values 
			* For more information see Bug #126164 */
			$("script[src=\"" + edqGlobalIntuitiveUnicornJsPath + "\"]").remove();
			$("<script>").attr({
				src:edqGlobalIntuitiveUnicornJsPath,
				integrity:"sha512-ooVQYWcrVoGAZXC+qPMJaFsEkLB82EsT42J+p0U5INWm+NHrN+XvnWsALGv440Zg3a/QsDJ2L9XR0592fkSBmA==",
				crossorigin:"anonymous"
			}).appendTo("body");
			reloadGIjs = false;
		}
	};
	const setEventsForShipping = function() { setEventsForListeners("shipping"); };
	addEventOnElement("#country", "change", setEventsForRegistration);
	addEventOnElement("[name=dwfrm_shipping_shippingAddress_addressFields_country]", "change", setEventsForShipping);
	addEventOnElement("[name=dwfrm_billing_addressFields_country]", "change", setEventsForBilling);
	addEventOnElement("#editShipping", "click", setEventsForShipping);
	addEventOnElement("[name=edqShippingAddAddress]", "click", setEventsForShipping);
	addEventOnElement("[name=edqShippingEditAddress]", "click", setEventsForShipping);
	addEventOnElement(".address-selector-block", "click", setEventsForBilling);
	addEventOnElement("#dwfrm_billing", "focus", setEventsForBilling);
	addEventOnElement("[value=submit-shipping]", "click", removeGlobalIntuitiveSuggestionBox);
}
function setEventsForListeners(checkoutStage) {
	setEdqInputSelectors(checkoutStage);
	edqSetGlobalIntuitiveConfiguration();
	addEventOnElement("[name=" + edqAddressLine1Id.name + "]", "keypress", setCountryField);
	addEventOnElement("[name=" + edqAddressLine1Id.name + "]", "mouseleave", setCountryField);
	addEventOnElement("[name=" + edqAddressLine1Id.name + "]", "mouseenter", setCountryField);
}
/**
* Global Intuitive creating multiple elements of suggestion box
* By doing this we remove all edq-verification-suggestion-box that are created; except the one we're using.
* For more information see Bug #108100 */
function removeMultipleEDQSuggestion() {
	var edqSuggestionBoxLength = document.querySelectorAll("#edq-verification-suggestion-box").length;
	for (var i=0; i < edqSuggestionBoxLength; i++) {
		var edqSuggestionBox = document.querySelector("#edq-verification-suggestion-box");
		edqSuggestionBox.parentNode.removeChild(edqSuggestionBox);
	}
}
/**
 * Pro Web - Address (Verification Engine)
 * Sets the configuration to use Pro Web - Address (Verification Engine) */
function edqValidateAddressCallBack() {
	var edqProWebMetaDataJSON;
	var edqProWebResponse = document.querySelector("#form-submit");
	if (edqProWebResponse.getAttribute("edq-metadata")) {
		edqProWebMetaDataJSON = JSON.parse(edqProWebResponse.getAttribute("edq-metadata"));
		document.getElementById(edqStateLineId.id).value = edqProWebMetaDataJSON["State code"];
		document.querySelector("#form-submit").removeAttribute("edq-metadata");
	}
	if (edqProWebCallbackValidation) {
		if (edqProWebExecuteTransitionCallBack(edqProWebMetaDataJSON)) {
			document.querySelector("#form-submit").style.display = "none";
			edqCurrentSubmitButtonSelector.style.display = "block";
			edqCurrentSubmitButtonSelector.removeAttribute("style");
			edqCurrentSubmitButtonSelector.click();
		}
	} else {
		document.querySelector("#form-submit").style.display = "none";
		edqCurrentSubmitButtonSelector.style.display = "block";
		edqCurrentSubmitButtonSelector.removeAttribute("style");
		edqCurrentSubmitButtonSelector.click();
	}
}
function setButtonConfigurationCallback() {
	edqCurrentSubmitButtonSelector.style.display = "none";
	document.querySelector("#form-submit").style.display = "block";
	document.querySelector("#form-submit").innerText = edqCurrentSubmitButtonSelector.innerText.replace(/\n/g, "");
}
function setEventsForListenersProWeb(checkoutStage, checkoutStageButton) {
	edqCurrentSubmitButtonSelector = document.querySelector(checkoutStageButton);
	setEdqInputSelectors(checkoutStage);
	setButtonConfigurationCallback();
	edqSetProWebConfiguration();
}
function edqCheckoutPageWorkflows() {
	/** This is intended to hide the form button in initial load of the page; just to show verification engine button in the form. **/
	if (edqCurrentSubmitButtonSelector) {
		edqCurrentSubmitButtonSelector.style.display = "none";
	}
	/** TASK:101727 Potential misconfiguration of checkout process.
    * By doing this we can refresh the configuration for Pro Web in Checkout stage; we can toogle between 
	* shipping and billing address elements; since the webpage doesn't reload, all elements are controlled by js and css; 
	* the listeners are set to refresh the configuration for Pro Web. */
	const setEventsForRegistrationStage = function() { setEventsForListenersProWeb("", "[name=save]"); };
	const setEventsForBillingStage = function() { setEventsForListenersProWeb("billing", "[value=submit-payment]"); };
	const setEventsForShippingStage = function() { setEventsForListenersProWeb("shipping", "[value=submit-shipping]"); };
	addEventOnElement("#country", "change", setEventsForRegistrationStage);
	addEventOnElement("#editShipping", "mousedown", setEventsForShippingStage);
	addEventOnElement(".shipping-address-block", "click", setEventsForShippingStage);
	addEventOnElement("#editPayment", "mousedown", setEventsForBillingStage);
	addEventOnElement(".billing-address", "click", setEventsForBillingStage);
	addEventOnElement("#dwfrm_billing", "focus", setEventsForBillingStage);
	
}
function edqSetProWebConfiguration() {
	document.getElementById("form-submit").addEventListener("mouseover", edqEmailPhoneValidationCallback);
	var proWebIsoCountry = vDefaultCountry;
	if (edqCountryLineId != null) {
		proWebIsoCountry = edqCountryLineId.value;
	}
	window.EdqConfig.PRO_WEB_TIMEOUT= 3500;
	window.EdqConfig.PRO_WEB_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS= [
		{
			type: "click",
			element: document.querySelector("#form-submit"),
		}
	];
	window.EdqConfig.PRO_WEB_LAYOUT=edqProWebAddressLayout;
	window.EdqConfig.PRO_WEB_COUNTRY=countryAlpha3(proWebIsoCountry);
	window.EdqConfig.PRO_WEB_CALLBACK="edqValidateAddressCallBack()";
	window.EdqConfig.PRO_WEB_MAPPING=[
		{
			field: edqAddressLine1Id,
			elements: ["Formatted Address 2"],
			modalFieldSelector:"#interaction-address--original-address-line-one",
		},
		{
			field: edqAddressLine2Id,
			elements: ["AddressLine2"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-address-line-two",
		},
		{
			field: edqCityLineId,
			elements: ["City name"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-locality",
		},
		{
			field: edqStateLineId,
			elements: ["State code"],
			modalFieldSelector:"#interaction-address--original-province",
		},
		{
			field: edqPostalLineId,
			separator: "-",
			elements: ["ZIP Code", "+4 code"],
			modalFieldSelector:"#interaction-address--original-postal-code",
		},
		{
			field: edqCountryLineId,
			elements: ['Two character ISO country code'],
			modalFieldSelector: "#",
		},
    ];
}
function edqProWebExecuteTransitionCallBack(edqProWebMetaDataJSON) { 
	var edqCustomFunctionName = edqCustomCallbackName;
	var edqJsonParameter = [edqProWebMetaDataJSON];
	var edqCustomTransitionCallback = window[edqCustomFunctionName];
	try {
		if (typeof edqCustomTransitionCallback === "function") {
			return edqCustomTransitionCallback.apply(null, edqJsonParameter);
		} else return true;
	} catch(err) { return true; }
}