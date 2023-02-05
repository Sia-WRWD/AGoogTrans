import {Injectable} from '@angular/core';

declare var google: any;

@Injectable({
    providedIn: 'root'
})

export class AGoogTransService {
    constructor() {}

    initTranslate(languagesToInclude: string) {
        new google.translate.TranslateElement({
            includedLanguages: languagesToInclude, //Insert Language Type (Other Codes refer to: https://developer.google.com/admin-sdk/directory/v1/languages)
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    }
}