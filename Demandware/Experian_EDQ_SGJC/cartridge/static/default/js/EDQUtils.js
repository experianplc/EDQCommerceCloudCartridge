/**Demandware uses ISO-2 codes for countries
 * This dictionary is intended to capture ISO-2 codes into ISO-3 codes
 * for Pegasus/Unicorn libraries
 **/
const vDefaultCountry = 'USA';
var countryDict = [];
var edqLineAddress1, edqLineAddress2, edqLineCity, edqLineState, edqLinePostal, edqLineCountry, edqLineEmail, edqLinePhone, edqLineButton;
var inputSelector = document.querySelectorAll('input');
var selectSelector = document.querySelectorAll('select');
var btnIndex;
var buttonSelector = document.querySelectorAll('button');
var edqEmailEnable, edqPhoneEnable;

if(!window.EdqConfig)
    window.EdqConfig = {};

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
function countryAlpha3(vAlphaTwo) { 
    var vAlphaThree;
    for (var i = 0; i < countryDict.length; i++) {
        if (vAlphaTwo.toUpperCase() == countryDict[i].key)
            vAlphaThree = countryDict[i].value;
    }
    return (vAlphaThree) ? vAlphaThree : vDefaultCountry;
}

for (var i = 0; i < inputSelector.length; i++)
{
    if (inputSelector[i].hasAttribute('id')) {
        edqLineAddress1 = (inputSelector[i].id.toLowerCase().match(/address1/)) ? inputSelector[i].id : edqLineAddress1;
        edqLineAddress2 = (inputSelector[i].id.toLowerCase().match(/address2/)) ? inputSelector[i].id : edqLineAddress2;
        edqLineCity = (inputSelector[i].id.toLowerCase().match(/city/)) ? inputSelector[i].id : edqLineCity;
        edqLinePostal = (inputSelector[i].id.toLowerCase().match(/postal/)) ? inputSelector[i].id : edqLinePostal;
        edqLinePhone = (inputSelector[i].id.toLowerCase().match(/phone/)) ? inputSelector[i].id : edqLinePhone;
        edqLineEmail = ((inputSelector[i].id == 'dwfrm_profile_customer_email') 
            || (inputSelector[i].id == 'dwfrm_billing_billingAddress_email_emailAddress')) ? inputSelector[i].id : edqLineEmail;
    }
}
for (var i = 0; i < selectSelector.length; i++)
{
    if (selectSelector[i].hasAttribute('id')) {
        edqLineState = (selectSelector[i].id.toLowerCase().match(/state/)) ? selectSelector[i].id : edqLineState;
        edqLineCountry = (selectSelector[i].id.toLowerCase().match(/country/)) ? selectSelector[i].id : edqLineCountry;
    }
}
for (var i = 0; i < buttonSelector.length; i++)
{
    if (buttonSelector[i].hasAttribute('name')) {
        if (buttonSelector[i].name.match(/dwfrm_profile_address_create/)) {
            edqLineButton = '[name=dwfrm_profile_address_create]';
        }
        if (buttonSelector[i].name.match(/dwfrm_profile_address_edit/)) {
            edqLineButton = '[name=dwfrm_profile_address_edit]';
        }
        if (buttonSelector[i].name.match(/dwfrm_singleshipping_shippingAddress_save/)) {
            edqLineButton = '[name=dwfrm_singleshipping_shippingAddress_save]';
        }
        if (buttonSelector[i].name.match(/dwfrm_profile_confirm/)) {
            edqLineButton = '[name=dwfrm_profile_confirm]';
        }
        if (buttonSelector[i].name.match(/dwfrm_billing_save/)) {
            edqLineButton = '[name=dwfrm_billing_save]';
            enableButtonDisable(false);
            /**Forcing the button to set the addlistener because the button is set as disabled since the page load 
             * that's why we're setting just this case here; this case just happens in SiteGenesis billing form. **/
            buttonSelector[i].addEventListener("mouseover", edqVerificationCallback);
            /*TASK:101728 Change Validate Button*/
            buttonSelector[i].style.display = "none";
            btnIndex = i;
        }
    }
}
if (document.getElementById(edqLinePhone)) { document.getElementById(edqLinePhone).addEventListener("mouseover", function() {enableButtonDisable(false);}); }
if (document.getElementById(edqLineEmail)) { document.getElementById(edqLineEmail).addEventListener("mouseover", function() {enableButtonDisable(false);}); }
if (document.querySelector(edqLineButton)) { document.querySelector(edqLineButton).addEventListener("mouseover", edqVerificationCallback); }

function edqVerificationCallback() {
    if ((edqEmailEnable) && (edqLineEmail)) { edqEmailValidationCallback(); }
    if ((edqPhoneEnable) && (edqLinePhone)) { edqPhoneValidationCallback(); }
}
    
function edqEmailValidation(edqToken) {
    window.EdqConfig.EMAIL_VALIDATE_AUTH_TOKEN=edqToken;
    window.EdqConfig.EMAIL_ELEMENTS=[
        document.getElementById(edqLineEmail)
    ];
}

function edqPhoneValidation(edqToken) {
    window.EdqConfig.GLOBAL_PHONE_VALIDATE_AUTH_TOKEN=edqToken;
    window.EdqConfig.REVERSE_PHONE_APPEND_MAPPINGS= [];
    window.EdqConfig.PHONE_ELEMENTS= [
        document.getElementById(edqLinePhone)
    ];
}

function edqGlobalIntuitive(edqToken) {
    window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN=edqToken;
    window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY=countryAlpha3(document.getElementById(edqLineCountry).value);
    window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= document.getElementById(edqLineAddress1);
    window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
            {
                field: document.getElementById(edqLineAddress1),
                elements: ['address.addressLine1']
            },
            {
                field: document.getElementById(edqLineAddress2),
                elements: ['address.addressLine2']
            },
            {
                field: document.getElementById(edqLineCity),
                elements: ['address.locality']
            },
            {
                field: document.getElementById(edqLineState),
                elements: ['address.province']
            },
            {
                field: document.getElementById(edqLinePostal),
                elements: ['address.postalCode']
            },
    ];
}

function edqVerificationEngine(edqToken, edqProWebLayout) {
    /* This is intended to hide the form button just 
	 * to show verification engine button in the form*/
	if (document.querySelector(edqLineButton)) {
		document.querySelector(edqLineButton).style.display = "none";
    }
    var modalFiledSelectorAddressOne = '#interaction-address--original-address-line-one'; 
	var modalFieldSelectorAddressTwo = '#interaction-address--original-address-line-two';
	var modalFieldSelectorLocality = '#interaction-address--original-locality';
	var modalFieldSelectorProvince = '#interaction-address--original-province';
    var modalFieldSelectorPostal = '#interaction-address--original-postal-code';
    
    window.EdqConfig.PRO_WEB_TIMEOUT= 2500;
	window.EdqConfig.PRO_WEB_AUTH_TOKEN=edqToken;
	window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS= [
		{
			type: 'click',
			element: document.querySelector('#form-submit'),
		}
	];
	window.EdqConfig.PRO_WEB_LAYOUT= edqProWebLayout;
	window.EdqConfig.PRO_WEB_COUNTRY= countryAlpha3(document.getElementById(edqLineCountry).value);
	window.EdqConfig.PRO_WEB_CALLBACK= 'edqValidateAddressCallBack()';
	window.EdqConfig.PRO_WEB_MAPPING= [
		{
			field: document.getElementById(edqLineAddress1),
			elements: ['Formatted Address 2'],
			modalFieldSelector: modalFiledSelectorAddressOne,
		},
		{
			field: document.getElementById(edqLineAddress2),
			elements: ['AddressLine2'],
			modalFieldSelector: modalFieldSelectorAddressTwo,
		},
		{
			field: document.getElementById(edqLineCity),
			elements: ['City name'],
			modalFieldSelector: modalFieldSelectorLocality,
		},
		{
			field: document.getElementById(edqLineState),
			elements: ['State code'],
			modalFieldSelector: modalFieldSelectorProvince,
		},
		{
			field: document.getElementById(edqLinePostal),
			separator: '-',
			elements: ['ZIP Code', '+4 code'],
			modalFieldSelector: modalFieldSelectorPostal,
		},
	];
}

function enableButtonDisable(buttonStatus) { 
    document.querySelector(edqLineButton).disabled = buttonStatus;
}

function edqPhoneValidationCallback(blnEdqValidatePhone) {
		if (blnEdqValidatePhone) {
			var edqSelectorResponse = document.getElementById(edqLinePhone);
			if (edqSelectorResponse.hasAttribute('edq-metadata')) {
				var edqPhoneResponse = JSON.parse(edqSelectorResponse.getAttribute('edq-metadata'));

				if ((edqPhoneResponse["Certainty"] == 'Verified'))
				{
					enableButtonDisable(false);
				} else {
					enableButtonDisable(true);
				} 
			}
		}
	 }
function edqEmailValidationCallback(blnEdqValidateEmail) {
    if (blnEdqValidateEmail) {
        var edqSelectorResponse = document.getElementById(edqLineEmail);
        if (edqSelectorResponse.hasAttribute('edq-metadata')) {
            var edqEmailResponse = JSON.parse(edqSelectorResponse.getAttribute('edq-metadata'));
            if ((edqEmailResponse["Certainty"] == 'verified')
            || (edqEmailResponse["Certainty"] == 'unknown'))
            {
                enableButtonDisable(false);
            } else {
                enableButtonDisable(true);
            } 
        }
    }
}
function edqValidateAddressCallBack() { 
    try {
        var edqProWebResponse = document.querySelector('#form-submit');

        if (edqProWebResponse.hasAttribute('edq-metadata')) {
            if (edqProWebResponse.getAttribute('edq-metadata'))
            {
                var edqResponse = JSON.parse(edqProWebResponse.getAttribute('edq-metadata'));
                if (btnIndex) {
                    buttonSelector[btnIndex].style.display = "inline-block";
                } else {
                    document.querySelector(edqLineButton).style.display = "inline-block";
                }
                document.querySelector('#form-submit').style.display = "none";
                document.getElementById(edqLineState).value = edqResponse["State code"];
                document.querySelector('#form-submit').removeAttribute('edq-metadata');
                document.querySelector(edqLineButton).click();
            }
        }
    } catch(error) {  }
}