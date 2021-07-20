interface SfccConfigObject {
	edqAddressLine1Element: HTMLInputElement;
	edqAddressLine2Element: HTMLInputElement;
	edqCityLineElement: HTMLInputElement;
	edqPostalLineElement: HTMLInputElement;
	edqStateLineElement: HTMLSelectElement;
	edqCountryElement: HTMLSelectElement;
	edqEmailLineElement: HTMLInputElement;
	edqPhoneLineElements: HTMLInputElement[];
	edqCurrentSubmitButton: HTMLButtonElement;
	edqGlobalIntuitiveUnicornJsPath: string;
	pageRestrictValidation: boolean;
	edqProWebCallback: string;
	edqGlobalIntuitiveUseCurrentLocation: boolean;
	edqVersion: string;
	
	headerUpdateAddressText: string;
	headerUnverifiedAddressText: string;
	headerInteractionUpdateAddressText: string;
	labelOriginalAddressText: string;
	labelUseOriginalAddressText: string;
	labelUseUpdatedAddressText: string;
	searchPlaceHolderAddressText: string;
	
	addressChanged: boolean;
	edqDpvIndicator: HTMLInputElement;
}