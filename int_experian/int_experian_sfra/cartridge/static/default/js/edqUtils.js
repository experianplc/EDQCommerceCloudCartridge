/*global EDQ*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/* exported edqSetEmailValidationConfiguration edqSetPhoneValidationConfiguration setCheckoutFormEvents edqValidateAddressCallBack */
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
	originalButtonDisplayNextPlaceOrderText,
	originalButtonDisplayPlaceOrderText,
	originalButtonDisplayNextPaymentText,
	pageCheckoutStage,
	edqDataSetUsage,
	edqDataSetCode,
	edqProWebCallbackValidation,
	edqCustomCallbackName;
var inputSelector = document.querySelectorAll("input[id]");
var buttonSelector = document.querySelectorAll("button[name]");
window.EdqConfig = window.EdqConfig || {};
/** Demandware uses ISO-2 codes for countries. This dictionary is intended to capture ISO-2 codes into ISO-3 codes for Pegasus/Unicorn libraries
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
 * Set values for EDQ variables
 ***/
function setEdqInputSelectors(stageContentLocation = "") {
	/** In SFRA the checkout web page contains both billing and shipping address input fields in a single page controlled by JavaScripts to hide/show elements.
	* The stageContentLocation variable is intended to specify the stage(billing/shipping) of the checkout web page to set the proper input address fields 
	* that we require to set them for billing or shipping address fields, since is they're set in the same web page we need to change its value to use them in the next step.*/
	if (stageContentLocation === "shipping") {
		edqAddressLine1Id = "shippingAddressOne";
		edqAddressLine2Id = "shippingAddressTwo";
		edqCityLineId = "shippingAddressCity";
		edqPostalLineId ="shippingZipCode";
		edqStateLineId = "shippingState";
		edqCountryLineId = "shippingCountry";
	} else if (stageContentLocation === "billing") {
		edqAddressLine1Id = "billingAddressOne";
		edqAddressLine2Id = "billingAddressTwo";
		edqCityLineId = "billingAddressCity";
		edqPostalLineId ="billingZipCode";
		edqStateLineId = "billingState";
		edqCountryLineId = "billingCountry";
	} else {
		edqAddressLine1Id = "address1";
		edqAddressLine2Id = "address2";
		edqCityLineId = "city";
		edqPostalLineId ="zipCode";
		edqStateLineId = "state";
		edqCountryLineId = "country";
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
	/**
	* BUG-126164
	* */
	$("script[src=\"https://edqprofservus.blob.core.windows.net/assets/production/global-intuitive-unicorn.js\"]").remove();	
	$("<script>").attr("src", "https://edqprofservus.blob.core.windows.net/assets/production/global-intuitive-unicorn.js").appendTo("footer");
	var globalIntuitiveIsoCountry;
	if(document.getElementById(edqCountryLineId) == null) 
		globalIntuitiveIsoCountry = vDefaultCountry;
	else
		globalIntuitiveIsoCountry = document.getElementById(edqCountryLineId).value;
	window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN=edqAuthorizationToken;
	window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY=countryAlpha3(globalIntuitiveIsoCountry);
	window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= document.getElementById(edqAddressLine1Id);
	/**
	* Feature 118583
	* Configuration option to include Data Sets for Global Intuitive*/
	if (edqDataSetUsage) window.EdqConfig.GLOBAL_INTUITIVE_DATASET=edqDataSetCode;
	window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
		{
			field: document.getElementById(edqAddressLine1Id),
			elements: ["address.addressLine1"]
		},
		{
			field: document.getElementById(edqAddressLine2Id),
			elements: ["address.addressLine2"]
		},
		{
			field: document.getElementById(edqCityLineId),
			elements: ["address.locality"]
		},
		{
			field: document.getElementById(edqStateLineId),
			elements: ["address.province"]
		},
		{
			field: document.getElementById(edqPostalLineId),
			elements: ["address.postalCode"]
		},
	];
}
/** In SFRA the checkout web page contains both billing and shipping in a single page controlled by JavaScript to hide/show elements. 
* The setCheckoutFormEvents is intended to set all input address fields variables depending on the stage we are(billing/shipping); 
* the selectors choose by this function just appear once the stage is completed; once we click on the selector the other will 
* be going to the stage that we're selecting and the will continue the regular workflow.*/
function setCheckoutFormEvents() {
	if (document.getElementById(edqCountryLineId) != null) 
		if (document.getElementById(edqCountryLineId).value === "") {
			document.getElementById(edqCountryLineId).value = "US";
		}
	/**
	* BUG-125898
	* */
	if (document.querySelector("[name=dwfrm_address_country]")) {
		document.querySelector("[name=dwfrm_address_country]").addEventListener("change", function() {
			setEventsForListeners();
		});
	}
	if (document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_country]")) {
		document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_country]").addEventListener("change", function() {
			setEventsForListeners("shipping");
		});
	}
	if (document.querySelector("[name=dwfrm_billing_addressFields_country]")) {
		document.querySelector("[name=dwfrm_billing_addressFields_country]").addEventListener("change", function() {
			setEventsForListeners("billing");
		});
	}
	if (document.querySelector("#editShipping")) {
		document.querySelector("#editShipping").addEventListener("click", function() {
			setEventsForListeners("shipping");
		});
	}
	if (document.querySelector("[name=edqShippingAddAddress]")) {
		document.querySelector("[name=edqShippingAddAddress]").addEventListener("click", function() {
			setEventsForListeners("shipping");
		});
	}
	if (document.querySelector("[name=edqShippingEditAddress]")) {
		document.querySelector("[name=edqShippingEditAddress]").addEventListener("click", function() {
			setEventsForListeners("shipping");
		});
	}
	if (document.querySelector(".address-selector-block")) {
		document.querySelector(".address-selector-block").addEventListener("click", function() {
			setEventsForListeners("billing");
		});
	}
	if (document.querySelector("[name=edqBillingAddAddress]")) {
		document.querySelector("[name=edqBillingAddAddress]").addEventListener("click", function() {
			setEventsForListeners("billing");
		});
	}
	if (document.querySelector("[name=edqBillingEditAddress]")) {
		document.querySelector("[name=edqBillingEditAddress]").addEventListener("click", function() {
			setEventsForListeners("billing");
		});
	}
}
function setEventsForListeners(checkoutStage) {
	setEdqInputSelectors(checkoutStage);
	removeMultipleEDQSuggestion();
	edqSetGlobalIntuitiveConfiguration();
	EDQ.address.globalIntuitive.activateValidation(document.getElementById(edqAddressLine1Id));
}
/**
* BUG-108100
* Remove all edq-verification-suggestion-box that are created so we have only one box active.
* */
function removeMultipleEDQSuggestion() {
	var edqSuggestionBoxLength = document.querySelectorAll("#edq-verification-suggestion-box").length;
	for (var i=0; i < edqSuggestionBoxLength; i++) {
		var edqSuggestionBox = document.querySelector("#edq-verification-suggestion-box");
		edqSuggestionBox.parentNode.removeChild(edqSuggestionBox);
	}
}
/**
 * Pro Web - Address (Verification Engine)
 * Sets the configuration to use Pro Web - Address (Verification Engine)
 */
function edqValidateAddressCallBack() {
	var edqProWebMetaDataJSON;
	var edqProWebResponse = document.querySelector("#form-submit");
	if (edqProWebResponse.getAttribute("edq-metadata")) {
		edqProWebMetaDataJSON = JSON.parse(edqProWebResponse.getAttribute("edq-metadata"));
		document.getElementById(edqStateLineId).value = edqProWebMetaDataJSON["State code"];
		document.querySelector("#form-submit").removeAttribute("edq-metadata");
	}
	if (edqProWebCallbackValidation) {
		if (edqProWebExecuteTransitionCallBack(edqProWebMetaDataJSON)) {
			edqCheckoutPageWorkflows();
		}
	} else { edqCheckoutPageWorkflows(); }
}
function edqCheckoutPageWorkflows() {
	edqCurrentSubmitButtonSelector.style.display = "inline-block";
	document.querySelector("#form-submit").style.display = "none";
	if ((pageCheckoutStage) && (pageCheckoutStage.match(/shipping/))) {
		pageCheckoutStage = "payment";
		var edqCheckoutButton = edqCurrentSubmitButtonSelector;
		edqCurrentSubmitButtonSelector.style.display = "none";
		setButtonConfigurationCallback("billing", "button[value=submit-payment]", originalButtonDisplayNextPlaceOrderText);
		edqSetProWebConfiguration();
		edqCheckoutButton.click();
	} else if ((pageCheckoutStage) && (pageCheckoutStage.match(/payment/))) {
		pageCheckoutStage = "";
		var edqPaymentButton = edqCurrentSubmitButtonSelector;
		edqCurrentSubmitButtonSelector.style.display = "none";
		setButtonConfigurationCallback("", "button[value=place-order]", originalButtonDisplayPlaceOrderText);
		edqPaymentButton.click();
	} else { edqCurrentSubmitButtonSelector.click(); }
}
function setButtonConfigurationCallback(selectorCurrentLocation, currentSubmitButton, currentSubmitButtonDisplayText) {
	var edqProWebSubmitButton = document.querySelector("#form-submit"); 
	setEdqInputSelectors(selectorCurrentLocation);
	//setEdqSelectSelectors(selectorCurrentLocation);
	edqCurrentSubmitButtonSelector = document.querySelector(currentSubmitButton);
	edqProWebSubmitButton.innerText = currentSubmitButtonDisplayText;
	edqProWebSubmitButton.style.display = "inline-block";
	edqCurrentSubmitButtonSelector.style.display = "none";
}
function edqSetProWebConfiguration() {
	/** TASK:101727 Potential misconfiguration of checkout process. 
     * This element uses mousedown because this event listener is triggered before the form submit event. *
     */
	if (document.getElementById("editShipping")) {
		document.getElementById("editShipping").addEventListener("mousedown", function() {
			pageCheckoutStage = "shipping";
			setButtonConfigurationCallback("shipping", "button[value=submit-payment]", originalButtonDisplayNextPaymentText);
			edqSetProWebConfiguration();
		});
	}
	if (document.getElementById("editPayment")) {
		document.getElementById("editPayment").addEventListener("mousedown", function() {
			pageCheckoutStage = "payment";
			setButtonConfigurationCallback("billing", "button[value=place-order]", originalButtonDisplayNextPlaceOrderText);
			edqSetProWebConfiguration();
		});
	}
	/** This is intended to hide the form button in initial load of the page; just to show verification engine button in the form. **/
	if (edqCurrentSubmitButtonSelector) {
		edqCurrentSubmitButtonSelector.style.display = "none";
	}
	document.getElementById("form-submit").addEventListener("mouseover", edqEmailPhoneValidationCallback);
	var proWebIsoCountry;
	if(document.getElementById(edqCountryLineId) == null) 
		proWebIsoCountry = vDefaultCountry;
	else
		proWebIsoCountry = document.getElementById(edqCountryLineId).value;
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
	//window.EdqConfig.PRO_WEB_CALLBACK2=function() { console.log("You should see this after verification and before page transitions "); };
	window.EdqConfig.PRO_WEB_MAPPING=[
		{
			field: document.getElementById(edqAddressLine1Id),
			elements: ["Formatted Address 2"],
			modalFieldSelector:"#interaction-address--original-address-line-one",
		},
		{
			field: document.getElementById(edqAddressLine2Id),
			elements: ["AddressLine2"],
			modalFieldSelector:"#interaction-address--original-address-line-two",
		},
		{
			field: document.getElementById(edqCityLineId),
			elements: ["City name"],
			modalFieldSelector:"#interaction-address--original-locality",
		},
		{
			field: document.getElementById(edqStateLineId),
			elements: ["State code"],
			modalFieldSelector:"#interaction-address--original-province",
		},
		{
			field: document.getElementById(edqPostalLineId),
			separator: "-",
			elements: ["ZIP Code", "+4 code"],
			modalFieldSelector:"#interaction-address--original-postal-code",
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