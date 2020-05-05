interface PhoneArgs {
	edqPhoneLineElements: HTMLElement;
}
interface PhoneConfigArgs extends PhoneArgs {
	edqAuthorizationToken: string;
}
/**
 * Phone validation
 * Sets the configuration to use Global Phone Validate
 *
 * @param edqAuthorizationToken - Contains the email authorization token for the Email Validate API
 * @param edqPhoneLineElements - Contains the selector of the phone input to be validated
 */
export function edqSetPhoneValidationConfiguration({edqAuthorizationToken, edqPhoneLineElements}: PhoneConfigArgs) {
	window.EdqConfig.GLOBAL_PHONE_VALIDATE_AUTH_TOKEN = edqAuthorizationToken;
	window.EdqConfig.PHONE_TIMEOUT = 3500;
	window.EdqConfig.REVERSE_PHONE_APPEND_MAPPINGS = [];
	window.EdqConfig.PHONE_ELEMENTS = edqPhoneLineElements;
}
interface PhoneCallbackArgs extends PhoneArgs {
	edqCurrentSubmitButton: HTMLElement
	edqValidatePhone: boolean;
	pageRestrictValidation: boolean;
}
/** 
 * Will manage the access restriction when Phone Validation is being used.
 *
 * @param edqValidatePhone - Enables or disables the Phone Validation usage
 * @param pageRestrictValidation - Enables or disables the page restriction for the page to go to next page on phone status
 * @param edqPhoneLineElements - Contains the selector of the phone input to be validated
 * @param edqCurrentSubmitButton - Contains the submit button that'll be managed to validate the page restriction
 */
function edqPhoneValidationCallback({edqValidatePhone, pageRestrictValidation, edqPhoneLineElements, edqCurrentSubmitButton}: PhoneCallbackArgs) {
	/** 
	 * Allow users to continue with invalid phone; 
	 * based on the Business Manager configuration we can set if we want to prevent the user to go through with an invalid phone.
	 * For more information refer to task #101729.
	 */
	if ((edqValidatePhone) && (pageRestrictValidation)) {
		edqPhoneLineElements.forEach(function(phoneSelector) {
			if (phoneSelector.hasAttribute("edq-metadata")) {
				let edqPhoneResponse: object = JSON.parse(phoneSelector.getAttribute("edq-metadata"));
				if (edqPhoneResponse["Certainty"] == "Verified") {
					 pageRestrictValidation = true;
					enableButtonDisable(edqCurrentSubmitButton, false);
				} else {
					 pageRestrictValidation = false;
					enableButtonDisable(edqCurrentSubmitButton, true);
				}
			}
		});
	}
}