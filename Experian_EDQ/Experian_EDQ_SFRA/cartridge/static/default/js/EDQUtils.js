const vDefaultCountry = 'USA';
var edqAddressLine1Selector,
    edqAddressLine2Selector,
    edqCityLineSelector,
    edqPostalLineSelector,
    edqStateLineSelector,
    edqCountryLineSelector,
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
    pageCheckoutStage;
var inputSelector = document.querySelectorAll('input[id]');
var selectSelector = document.querySelectorAll('select[id]');
var buttonSelector = document.querySelectorAll('button[name]');
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
function setEdqInputSelectors(InputSelectorContentLocation = '') {
    for (var i = 0; i < inputSelector.length; i++) {
        /**
         * This InputSelectorContentLocation variable is intended to specify the input address fields that we require in case we are using 
         * some of these products more than once in a single page, case for checkout page since it has the shipping/payment address on the same page; 
         * if it has blank we won't be needing to set that variable with a specific value and can take the address values from the page.
         */
        if ((inputSelector[i].id.toLowerCase().match(InputSelectorContentLocation)) || (InputSelectorContentLocation == '')) {
            edqAddressLine1Selector = (inputSelector[i].id.toLowerCase().match(/address1|addressone/)) ? inputSelector[i] : edqAddressLine1Selector;
            edqAddressLine2Selector = (inputSelector[i].id.toLowerCase().match(/address2|addresstwo/)) ? inputSelector[i] : edqAddressLine2Selector;
            edqCityLineSelector = (inputSelector[i].id.toLowerCase().match(/city/)) ? inputSelector[i] : edqCityLineSelector;
            edqPostalLineSelector = (inputSelector[i].id.toLowerCase().match(/zipcode/)) ? inputSelector[i] : edqPostalLineSelector;
        }
        if (inputSelector[i].id.toLowerCase().match(/phone/)) { edqPhoneLineSelectors.push(inputSelector[i]); }
        edqEmailLineSelector = ((inputSelector[i].id == 'registration-form-email') || (inputSelector[i].id == 'email')) ? inputSelector[i] : edqEmailLineSelector;
    }
}
function setEdqSelectSelectors(InputSelectorContentLocation = '') {
    for (var i = 0; i < selectSelector.length; i++) {
        /**
         * This InputSelectorContentLocation variable is intended to specify the input address fields that we require in case we are using 
         * some of these products more than once in a single page, case for checkout page since it has the shipping/payment address on the same page; 
         * if it has blank we won't be needing to set that variable with a specific value and can take the address values from the page.
         */
        if ((selectSelector[i].id.toLowerCase().match(InputSelectorContentLocation)) || (InputSelectorContentLocation == '')) {
            edqStateLineSelector = (selectSelector[i].id.toLowerCase().match(/state/)) ? selectSelector[i] : edqStateLineSelector;
            edqCountryLineSelector = (selectSelector[i].id.toLowerCase().match(/country/)) ? selectSelector[i] : edqCountryLineSelector;
        }
    }
}
for (var i = 0; i < buttonSelector.length; i++) {
    /**
     * This part is intended to find out the submit button for the checkout page; in this page there are 3 submit buttons with the label name=submit; 
     * so for this page the only way to distinguish them is for the label value; this case is just for initial load.
     */
    if (window.location.href.toLowerCase().match(/checkout/)) {
        if (buttonSelector[i].hasAttribute('value')) {
        	edqCurrentSubmitButtonSelector = (buttonSelector[i].value.toLowerCase().match(/shipping/)) ? buttonSelector[i] : edqCurrentSubmitButtonSelector;
            buttonSelector[i].addEventListener("mouseover", edqEmailPhoneValidationCallback);
        }
    } else {
        edqCurrentSubmitButtonSelector = (buttonSelector[i].name.toLowerCase().match(/save/)) ? buttonSelector[i] : edqCurrentSubmitButtonSelector;
        buttonSelector[i].addEventListener("mouseover", edqEmailPhoneValidationCallback);
    }
}
/**
 * This window.location is intended to specify the input address fields that we require when we get to the checkout page for initial load.
 */
if (window.location.href.toLowerCase().match(/checkout/)) {
    setEdqInputSelectors('shipping');
    setEdqSelectSelectors('shipping');
} else {
    setEdqInputSelectors();
    setEdqSelectSelectors();
}
if (edqEmailLineSelector) { edqEmailLineSelector.addEventListener("mouseover", function() {enableButtonDisable(false);}); }
if (edqPhoneLineSelectors) { edqPhoneLineSelectors.forEach(phoneSelector => { phoneSelector.addEventListener("mouseover", function() {enableButtonDisable(false);}) }); }
function edqEmailPhoneValidationCallback() {
    if ((edqEmailEnable) && (edqEmailLineSelector)) { edqEmailValidationCallback(); }
    if ((edqPhoneEnable) && (edqPhoneLineSelectors)) { edqPhoneValidationCallback(); }
}
function enableButtonDisable(buttonStatus) { 
	edqCurrentSubmitButtonSelector.disabled = buttonStatus;
    if (document.getElementById('form-submit')) { document.getElementById('form-submit').disabled = buttonStatus; }
}
function edqPhoneValidationCallback() {
    /* TASK:101729 Allow users to continue with invalid email or phone */
    if (edqValidatePhone) {
        edqPhoneLineSelectors.forEach(phoneSelector => {
            if (phoneSelector.hasAttribute('edq-metadata')) {
                var edqPhoneResponse = JSON.parse(phoneSelector.getAttribute('edq-metadata'));
                if (edqPhoneResponse["Certainty"] == 'Verified') {
                    enableButtonDisable(false);
                } else {
                    enableButtonDisable(true);
                }
            }
        });
    }
}
function edqEmailValidationCallback() {
    /* TASK:101729 Allow users to continue with invalid email or phone */
    if (edqValidateEmail) {
        if (edqEmailLineSelector.hasAttribute('edq-metadata')) {
            var edqEmailResponse = JSON.parse(edqEmailLineSelector.getAttribute('edq-metadata'));
            if ((edqEmailResponse["Certainty"] == 'verified') || (edqEmailResponse["Certainty"] == 'unknown')) {
                enableButtonDisable(false);
            } else {
                enableButtonDisable(true);
            } 
        }
    }
}
/**
 * Email validation
 * Sets the configuration to use email validation
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
 * Sets the configuation to use phone validation
 */
function edqSetPhoneValidationConfiguration() {
    window.EdqConfig.GLOBAL_PHONE_VALIDATE_AUTH_TOKEN=edqAuthorizationToken;
    window.EdqConfig.PHONE_TIMEOUT=3500;
    window.EdqConfig.REVERSE_PHONE_APPEND_MAPPINGS= [];
    window.EdqConfig.PHONE_ELEMENTS=edqPhoneLineSelectors;
}
/**
 * Global Intuitive
 * Sets the configuation to use global intuitive
 */
function edqSetGlobalIntuitiveConfiguration() {
    window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN=edqAuthorizationToken;
    window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY=countryAlpha3(edqCountryLineSelector.value);
    window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= edqAddressLine1Selector;
    window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
        {
            field: edqAddressLine1Selector,
            elements: ['address.addressLine1']
        },
        {
            field: edqAddressLine2Selector,
            elements: ['address.addressLine2']
        },
        {
            field: edqCityLineSelector,
            elements: ['address.locality']
        },
        {
            field: edqStateLineSelector,
            elements: ['address.province']
        },
        {
            field: edqPostalLineSelector,
            elements: ['address.postalCode']
        },
    ];
}
function setCheckoutFormEvents() {
    if (edqCountryLineSelector.value === "") {
        edqCountryLineSelector.value = "US";
    }
    if (document.querySelector('.shipment-selector-block')) {
        document.querySelector('.shipment-selector-block').addEventListener("click", function() {
            setEdqInputSelectors('shipping');
            setEdqSelectSelectors('shipping');
            removeMultipleEDQSuggestion();
            edqSetGlobalIntuitiveConfiguration();
            EDQ.address.globalIntuitive.activateValidation(document.getElementById('shippingAddressOne'));
        });
    }
    if (document.querySelector('.address-selector-block')) {
        document.querySelector('.address-selector-block').addEventListener("click", function() {
            setEdqInputSelectors('billing');
            setEdqSelectSelectors('billing');
            removeMultipleEDQSuggestion();
            edqSetGlobalIntuitiveConfiguration();
            EDQ.address.globalIntuitive.activateValidation(document.getElementById('billingAddressOne'));
        });
    }
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
    var edqProWebResponse = document.querySelector('#form-submit');
    if (edqProWebResponse.getAttribute('edq-metadata')) {
        var edqMetaDataResponse = JSON.parse(edqProWebResponse.getAttribute('edq-metadata'));
        edqStateLineSelector.value = edqMetaDataResponse["State code"];
        //document.querySelector('#form-submit').removeAttribute('edq-metadata');
    }
    edqCurrentSubmitButtonSelector.style.display = "inline-block";
    document.querySelector('#form-submit').style.display = "none";
    if ((pageCheckoutStage) && (pageCheckoutStage.match(/shipping/))) {
        pageCheckoutStage = 'payment';
        var edqLastButton = edqCurrentSubmitButtonSelector;
        edqCurrentSubmitButtonSelector.style.display = "none";
        setButtonConfigurationCallback('billing', 'button[value=submit-payment]', originalButtonDisplayNextPlaceOrderText);
        edqSetProWebConfiguration();
        edqLastButton.click();
    } else if ((pageCheckoutStage) && (pageCheckoutStage.match(/payment/))) {
        pageCheckoutStage = '';
        var edqLastButton = edqCurrentSubmitButtonSelector;
        edqCurrentSubmitButtonSelector.style.display = "none";
        setButtonConfigurationCallback('', 'button[value=place-order]', originalButtonDisplayPlaceOrderText)
        edqLastButton.click();
    } else { edqCurrentSubmitButtonSelector.click(); }
}
function setButtonConfigurationCallback(selectorCurrentLocation, currentSubmitButton, currentSubmitButtonDisplayText) {
	var edqProWebSubmitButton = document.querySelector('#form-submit'); 
	setEdqInputSelectors(selectorCurrentLocation);
    setEdqSelectSelectors(selectorCurrentLocation);
    edqCurrentSubmitButtonSelector = document.querySelector(currentSubmitButton);
    edqProWebSubmitButton.innerText = currentSubmitButtonDisplayText;
    edqProWebSubmitButton.style.display = "inline-block";
    edqCurrentSubmitButtonSelector.style.display = "none";
}
function edqSetProWebConfiguration() {
    /** TASK:101727 Potential misconfiguration of checkout process 
     * This elements uses mousedown **/
    if (document.getElementById("editShipping")) {
        document.getElementById("editShipping").addEventListener("mousedown", function() {
            pageCheckoutStage = 'shipping';
            setButtonConfigurationCallback('shipping', 'button[value=submit-payment]', originalButtonDisplayNextPaymentText);
            edqSetProWebConfiguration();
        });
    }
    if (document.getElementById("editPayment")) {
        document.getElementById("editPayment").addEventListener("mousedown", function() {
            pageCheckoutStage = 'payment';
            setButtonConfigurationCallback('billing', 'button[value=place-order]', originalButtonDisplayNextPlaceOrderText);
            edqSetProWebConfiguration();
        });
    }
    /** This is intended to hide the form button just to show verification engine button in the form **/
    if (edqCurrentSubmitButtonSelector) {
        edqCurrentSubmitButtonSelector.style.display = "none";
    }
    document.getElementById('form-submit').addEventListener("mouseover", edqEmailPhoneValidationCallback);
    window.EdqConfig.PRO_WEB_TIMEOUT= 3500;
    window.EdqConfig.PRO_WEB_AUTH_TOKEN=edqAuthorizationToken;
    window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS= [
        {
            type: 'click',
            element: document.querySelector('#form-submit'),
        }
    ];
    window.EdqConfig.PRO_WEB_LAYOUT=edqProWebAddressLayout;
    window.EdqConfig.PRO_WEB_COUNTRY=countryAlpha3(edqCountryLineSelector.value);
    window.EdqConfig.PRO_WEB_CALLBACK='edqValidateAddressCallBack()';
    window.EdqConfig.PRO_WEB_MAPPING=[
        {
            field: edqAddressLine1Selector,
            elements: ['Formatted Address 2'],
            modalFieldSelector:'#interaction-address--original-address-line-one',
        },
        {
            field: edqAddressLine2Selector,
            elements: ['AddressLine2'],
            modalFieldSelector:'#interaction-address--original-address-line-two',
        },
        {
            field: edqCityLineSelector,
            elements: ['City name'],
            modalFieldSelector:'#interaction-address--original-locality',
        },
        {
            field: edqStateLineSelector,
            elements: ['State code'],
            modalFieldSelector:'#interaction-address--original-province',
        },
        {
            field: edqPostalLineSelector,
            separator: '-',
            elements: ['ZIP Code', '+4 code'],
            modalFieldSelector:'#interaction-address--original-postal-code',
        },
    ];
}