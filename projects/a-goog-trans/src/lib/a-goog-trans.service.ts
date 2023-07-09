import {Injectable} from '@angular/core';

declare var google: any;

@Injectable({
    providedIn: 'root'
})

export class AGoogTransService {
    
    constructor() {}

    googleTranslateElementInit(languagesToInclude: string, defaultLanguage: string) {
        const googleTranslateScript = document.createElement('script');
        googleTranslateScript.type = 'text/javascript';
        googleTranslateScript.async = true;
        googleTranslateScript.src =
          'https://translate.google.com/translate_a/element.js?cb=onGoogleTranslateLoad';
        document.body.appendChild(googleTranslateScript);
    
        // Define the callback function
        (window as any).onGoogleTranslateLoad = () => {
          new (window as any).google.translate.TranslateElement({
            pageLanguage: defaultLanguage,
            includedLanguages: languagesToInclude, //Insert Language Type (Other Codes refer to: https://developer.google.com/admin-sdk/directory/v1/languages)
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        };
    }
}