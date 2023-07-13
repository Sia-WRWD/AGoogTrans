import { Component, OnInit, Input } from '@angular/core';
import { AGoogTransService } from './a-goog-trans.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'a-goog-trans',
  template: `
    <div class="google-translator-container" id="gtc">
      <div class="google-translator-icon" (click)="showHideTranslator()">
        <img src="../assets/flags/default-flag.png" alt="gti.png" id="flag-icon" />
      </div>
      <ng-container *ngIf="googleTranslatorVisibility == true">
        <div class="google-language-select notranslate" id="gts">
          <div class="dropdown">
            <button (click)="toggleDropdown()" class="dropbtn">{{ selectedLanguage.label }}</button>
            <div *ngIf="isOpen" class="dropdown-content" style="display: block;">
              <ng-container *ngFor="let option of userLangOptions">
                <a (click)="executeTranslation(option.value)">{{option.label}}</a>
              </ng-container>
            </div>
          </div>
        </div>
      </ng-container>
      <div id="google_translate_element" style="display: none;"></div>
    </div>
  `,
  styles: [`
    .google-translator-container {
        position: fixed;
        bottom: 155px;
        right: 23px;
        height: 50px;
        z-index: 2;
        display: flex;
        flex-direction: row;
        background: #ffffff;
        padding: 10px;
        border-radius: 25px;
        align-items: center;
        box-shadow: 0 3px 12px rgb(0 0 0 / 15%);
        width: 50px;
        transition: all 0.3s;
        column-gap: 10px;
        justify-content: center;
    }

    .google-translator-icon img {
        filter: drop-shadow(1px 2px 2px black);
        width: 100%;
        height: 100%;
    }

    .google-language-select {
        width: 100%;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .dropbtn {
        background-color: #4285F4;
        color: white;
        padding: 10px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        width: 100%;
        border-radius: 7px;
        font-weight: 600;
        text-shadow: 1px 2px 3px black;
        letter-spacing: 1px;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        width: 100%;
        height: 125px;
        overflow-y: auto;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    //Other Stuff
    #google_translate_element {
        margin: auto;
    }

    ::ng-deep .goog-te-gadget img {
        display: none !important;
    }

    ::ng-deep .goog-te-gadget-simple .VIpgJd-ZVi9od-xl07Ob-lTBxed span {
        border: 0 !important;
    }

    ::ng-deep .goog-te-gadget-simple {
        border: 0 !important;
    }

    ::ng-deep .VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate {
        display: none !important;
    }
  `]
})

/*CSS Class Name Change
1. .VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate (new) .goog-te-banner-frame.skiptranslate (prev)
2. .VIpgJd-ZVi9od-xl07Ob-lTBxed (new) .goog-te-menu-value (prev)
*/

export class AGoogTransComponent implements OnInit {

  @Input() languagesToInclude!: string;
  @Input() defaultLanguage!: string;
  @Input() domainName: string;

  googleTranslatorVisibility: boolean = false;
  previousLanguage: any;
  flagAssetsPath: string = "../assets/flags/";

  availableLangOptions: any = [
    { label: "English", value: "en" },
    { label: "Filipino", value: "tl" },
    { label: "Hindi", value: "hi" },
    { label: "Indonesian", value: "id" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Malay", value: "ms" },
    { label: "Chinese (PRC)", value: "zh-CN" },
    { label: "Thai", value: "th" },
    { label: "Chinese (TW)", value: "zh-TW" },
    { label: "Vietnamese", value: "vi" }
  ];
  userLangOptions: any = [];
  selectedLanguage: any = "";
  isOpen: boolean = false;

  constructor(
    private googleTranslateService: AGoogTransService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (!this.languagesToInclude) {
      this.languagesToInclude = "en,tl,id,ja,ko,ms,zh-CN,hi,th,zh-TW,vi";
      this.userLangOptions = this.availableLangOptions;
    } else {
      this.userLangOptions = this.availableLangOptions.filter((language: any) =>
        this.languagesToInclude.includes(language.value)
      );
    }

    if (this.domainName == null) {
      this.domainName = "localhost";
    }

    this.googleTranslateService.googleTranslateElementInit(this.languagesToInclude, this.defaultLanguage);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setFirstLanguage();
    }, 100); // Adjust the delay as needed
  }

  executeTranslation(languageCode: string) {
    const formattedLanguageCode = "/en/" + languageCode;
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `googtrans=${formattedLanguageCode}; expires=${expires.toUTCString()}; path=/`;
    location.reload();
  }

  setFirstLanguage() {
    const languageValue = this.cookieService.get('googtrans');

    if (!languageValue) {
      this.changePic("default");
      this.selectedLanguage = this.availableLangOptions.find((language: any) => language.value === 'en');
    } else {
      const langCode = languageValue.split('/').pop();
      this.selectedLanguage = this.availableLangOptions.find((language: any) => language.value === langCode);
      this.changePic(langCode!);
    }
  }

  showHideTranslator() {
    var gtc = document.getElementById('gtc');

    if (this.googleTranslatorVisibility == false) {
      gtc!.style.width = "250px";
      gtc!.style.padding = "15px";
      this.googleTranslatorVisibility = true;
    } else {
      gtc!.style.width = "50px";
      gtc!.style.padding = "10px";
      this.googleTranslatorVisibility = false;
    }
  }

  changePic(language: string) {
    var imageToChange = document.getElementById("flag-icon") as HTMLImageElement | null;

    if (imageToChange != null) {
      imageToChange.src = this.flagAssetsPath + language + "-flag.png";
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
