/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
var vDefaultCountry,
	edqAddressLine1Selector,
	edqAddressLine2Selector,
	edqCityLineSelector,
	edqPostalLineSelector,
	edqStateLineSelector,
	edqCountryLineSelector, 
	edqEmailLineSelector, 
	edqPhoneLineSelectors, 
	edqCurrentSubmitButtonSelector,
	edqCurrentSubmitButtonSelectorIndex,
	edqEmailEnable, 
	edqPhoneEnable,
	edqValidateEmail, 
	edqValidatePhone, 
	edqAuthorizationToken, 
	edqProWebAddressLayout,
	edqDataSetUsage,
	edqDataSetCode,
	edqProWebCallbackValidation,
	edqCustomCallbackName;
var inputSelector = document.querySelectorAll("input[id]");
var selectSelector = document.querySelectorAll("select[id]");
var buttonSelector = document.querySelectorAll("button[name]");
window.EdqConfig = window.EdqConfig || {};
/**Demandware uses ISO-2 codes for countries. This dictionary is intended to capture ISO-2 codes into ISO-3 codes for Pegasus/Unicorn libraries
 **/
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
/***
 * Set values to EDQ variables
 ***/
for (var i = 0; i < inputSelector.length; i++) {
	edqAddressLine1Selector = (inputSelector[i].id.toLowerCase().match(/address1/)) ? inputSelector[i] : edqAddressLine1Selector;
	edqAddressLine2Selector = (inputSelector[i].id.toLowerCase().match(/address2/)) ? inputSelector[i] : edqAddressLine2Selector;
	edqCityLineSelector = (inputSelector[i].id.toLowerCase().match(/city/)) ? inputSelector[i] : edqCityLineSelector;
	edqPostalLineSelector = (inputSelector[i].id.toLowerCase().match(/postal/)) ? inputSelector[i] : edqPostalLineSelector;
	edqPhoneLineSelectors = (inputSelector[i].id.toLowerCase().match(/phone/)) ? inputSelector[i] : edqPhoneLineSelectors;
	edqEmailLineSelector = ((inputSelector[i].id == "dwfrm_profile_customer_email") 
        || (inputSelector[i].id == "dwfrm_billing_billingAddress_email_emailAddress")) ? inputSelector[i] : edqEmailLineSelector;
}
for (var indexSelector = 0; indexSelector < selectSelector.length; indexSelector++) {
	edqStateLineSelector = (selectSelector[indexSelector].id.toLowerCase().match(/state/)) ? selectSelector[indexSelector] : edqStateLineSelector;
	edqCountryLineSelector = (selectSelector[indexSelector].id.toLowerCase().match(/country/)) ? selectSelector[indexSelector] : edqCountryLineSelector;
}
for (var indexButton = 0; indexButton < buttonSelector.length; indexButton++) {
	if (buttonSelector[indexButton].name.match(/dwfrm_profile_address_create/)) { edqCurrentSubmitButtonSelector = buttonSelector[indexButton]; }
	if (buttonSelector[indexButton].name.match(/dwfrm_profile_address_edit/)) { edqCurrentSubmitButtonSelector = buttonSelector[indexButton]; }
	if (buttonSelector[indexButton].name.match(/dwfrm_singleshipping_shippingAddress_save/)) { edqCurrentSubmitButtonSelector = buttonSelector[indexButton]; }
	if (buttonSelector[indexButton].name.match(/dwfrm_profile_confirm/)) { edqCurrentSubmitButtonSelector = buttonSelector[indexButton]; }
	if (buttonSelector[indexButton].name.match(/dwfrm_billing_save/)) {
		edqCurrentSubmitButtonSelector = buttonSelector[indexButton];
		enableButtonDisable(edqCurrentSubmitButtonSelector, false);
		/**Forcing the button to set the addlistener because the button is set as disabled since the page load 
         * that's why we're setting just this case here; this case just happens in SiteGenesis billing form. **/
		buttonSelector[indexButton].addEventListener("mouseover", edqVerificationCallback);
		/*TASK:101728 Change Validate Button*/
		buttonSelector[indexButton].style.display = "none";
		edqCurrentSubmitButtonSelectorIndex = indexButton;
	}
}
if (edqPhoneLineSelectors) { edqPhoneLineSelectors.addEventListener("mouseover", function() {enableButtonDisable(edqCurrentSubmitButtonSelector, false);}); }
if (edqEmailLineSelector) { edqEmailLineSelector.addEventListener("mouseover", function() {enableButtonDisable(edqCurrentSubmitButtonSelector, false);}); }
if (edqCurrentSubmitButtonSelector) { edqCurrentSubmitButtonSelector.addEventListener("mouseover", edqVerificationCallback); }
if (document.querySelector("#form-submit")) { document.querySelector("#form-submit").addEventListener("mouseover", edqVerificationCallback); }
function edqVerificationCallback() {
	if ((edqEmailEnable) && (edqEmailLineSelector)) { edqPhoneEmailValidationCallback(edqValidateEmail, edqEmailLineSelector); }
	if ((edqPhoneEnable) && (edqPhoneLineSelectors)) { edqPhoneEmailValidationCallback(edqValidatePhone, edqPhoneLineSelectors); }
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
function edqPhoneEmailValidationCallback(blnValidationOption, edqSelectorResponse) {
	/** TASK:101729 Allow users to continue with invalid phone and email; 
     * based on the Business Manager configuration we can set if we want to prevent the user to go through with an invalid phone. */
	if (!edqSelectorResponse) { return; }
	if ((blnValidationOption) && (edqSelectorResponse.hasAttribute("edq-metadata"))) {
		var edqMetaDataResponse = JSON.parse(edqSelectorResponse.getAttribute("edq-metadata"));
		if ((edqMetaDataResponse["Certainty"].toLowerCase() == "verified") || (edqMetaDataResponse["Certainty"].toLowerCase() == "unknown")) {
			enableButtonDisable(edqCurrentSubmitButtonSelector, false);
		} else {
			enableButtonDisable(edqCurrentSubmitButtonSelector, true);
		}
	}
}
/**
 * Email validation
 * Sets the configuration to use Email Validate
 */
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
	window.EdqConfig.PHONE_ELEMENTS= [
		edqPhoneLineSelectors
	];
}
/**
 * Global Intuitive
 * Sets the configuration to use Global Intuitive
 */
function edqSetGlobalIntuitiveConfiguration() {
	window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY=countryAlpha3(edqCountryLineSelector.value);
	/**
     * Feature 118583
     * Configuration option to include Data Sets for Global Intuitive
     */
	if (edqDataSetUsage) window.EdqConfig.GLOBAL_INTUITIVE_DATASET=edqDataSetCode;
	window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= edqAddressLine1Selector;
	window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
		{
			field: edqAddressLine1Selector,
			elements: ["address.addressLine1"]
		},
		{
			field: edqAddressLine2Selector,
			elements: ["address.addressLine2"]
		},
		{
			field: edqCityLineSelector,
			elements: ["address.locality"]
		},
		{
			field: edqStateLineSelector,
			elements: ["address.province"]
		},
		{
			field: edqPostalLineSelector,
			elements: ["address.postalCode"]
		},
	];
}
/**
 * Pro Web - Address (Verification Engine)
 * Sets the configuration to use Pro Web - Address (Verification Engine)
 */
function edqValidateAddressCallBack() {
	var edqProWebResponse = document.querySelector("#form-submit");
	if (!edqProWebResponse.hasAttribute("edq-metadata")) { return; }
	var edqProWebMetaDataJSON = JSON.parse(edqProWebResponse.getAttribute("edq-metadata"));
	document.querySelector("#form-submit").style.display = "none";
	edqStateLineSelector.value = edqProWebMetaDataJSON["State code"];
	if (edqProWebCallbackValidation) {
		if (edqProWebExecuteTransitionCallBack(edqProWebMetaDataJSON)) { edqCheckoutPageWorkflows(); }
	} else { edqCheckoutPageWorkflows(); }
}
function edqCheckoutPageWorkflows() {
	if (edqCurrentSubmitButtonSelectorIndex) {
		buttonSelector[edqCurrentSubmitButtonSelectorIndex].style.display = "inline-block";
		buttonSelector[edqCurrentSubmitButtonSelectorIndex].click();
	} else {
		edqCurrentSubmitButtonSelector.style.display = "inline-block";
		edqCurrentSubmitButtonSelector.click();
	}
}
function edqSetProWebConfiguration() {
	/** This is intended to hide the form button in initial load of the page; just to show verification engine button in the form. **/
	if (edqCurrentSubmitButtonSelector) {
		edqCurrentSubmitButtonSelector.style.display = "none";
	}
	window.EdqConfig.PRO_WEB_TIMEOUT= 3500;
	window.EdqConfig.PRO_WEB_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS= [
		{
			type: "click",
			element: document.querySelector("#form-submit"),
		}
	];
	window.EdqConfig.PRO_WEB_LAYOUT= edqProWebAddressLayout;
	window.EdqConfig.PRO_WEB_COUNTRY= countryAlpha3(edqCountryLineSelector.value);
	window.EdqConfig.PRO_WEB_CALLBACK= "edqValidateAddressCallBack()";
	window.EdqConfig.PRO_WEB_MAPPING= [
		{
			field: edqAddressLine1Selector,
			elements: ["Formatted Address 2"],
			modalFieldSelector: "#interaction-address--original-address-line-one",
		},
		{
			field: edqAddressLine2Selector,
			elements: ["AddressLine2"],
			modalFieldSelector: "#interaction-address--original-address-line-two",
		},
		{
			field: edqCityLineSelector,
			elements: ["City name"],
			modalFieldSelector: "#interaction-address--original-locality",
		},
		{
			field: edqStateLineSelector,
			elements: ["State code"],
			modalFieldSelector: "#interaction-address--original-province",
		},
		{
			field: edqPostalLineSelector,
			separator: "-",
			elements: ["ZIP Code", "+4 code"],
			modalFieldSelector: "#interaction-address--original-postal-code",
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