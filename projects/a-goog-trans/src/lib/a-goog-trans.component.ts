import { Component, OnInit, Input } from '@angular/core';
import { AGoogTransService } from './a-goog-trans.service';

@Component({
  selector: 'a-goog-trans',
  template: `
    <div class="google-translator-container" id="gtc">
      <div class="google-translator-icon" (click)="showHideTranslator()">
          <img src="../assets/flags/select-language-flag.png" alt="gti.png" id="flag-icon" />
      </div>
      <div id="google_translate_element" style="display: block;"></div>
    </div>
  `,
  styles: [`
    .google-translator-container {
      position: fixed;
      bottom: 155px;
      right: 23px;
      z-index: 2;
      display: flex;
      flex-direction: row;
      background: #ffffff;
      padding: 10px 11px;
      border-radius: 25px;
      align-items: center;
      box-shadow: 0 3px 12px rgb(0 0 0 / 15%);
      width: 29px;
      height: 25px;
      overflow: hidden;
      transition: all 0.3s;
    }

    .google-translator-container .google-translator-icon {
      margin-right: 15px;
    }

    .google-translator-icon img {
      filter: drop-shadow(1px 2px 2px black)
    }

    #google_translate_element {
      margin: auto;
    }

    :host ::ng-deep .goog-te-gadget img {
      display: none !important;
    }

    :host ::ng-deep .goog-te-gadget-simple .goog-te-menu-value span {
      border: 0 !important;
    }

    :host ::ng-deep .goog-te-gadget-simple {
      border: 0 !important;
    }

    ::ng-deep .goog-te-banner-frame.skiptranslate {
      display: none !important;
    }
  `]
})
export class AGoogTransComponent implements OnInit {
  @Input() languagesToInclude: string;

  googleTranslatorVisibility: boolean = false;
  previousLanguage: string = "";
  flagAssetsPath: string = "../assets/flags/";

  constructor(private googleTranslateService: AGoogTransService) { }

  ngOnInit(): void {
      this.googleTranslateService.initTranslate(this.languagesToInclude);
      this.setFirstLanguage();
  }

  setFirstLanguage() {
      const link2 = document.querySelector('.goog-te-menu-value span:first-child');
      this.previousLanguage = link2.textContent;

      this.observeLanguageChange();
  }

  observeLanguageChange() {
      setInterval(() => {
          const link2 = document.querySelector('.goog-te-menu-value span:first-child');

          if (this.previousLanguage != link2.textContent) {
              this.previousLanguage = link2.textContent;
              this.changePic(this.previousLanguage);
          }
      }, 1000);
  }

  showHideTranslator() {
      if (this.googleTranslatorVisibility == false) {
          var gtc = document.getElementById('gtc');
          gtc.style.width = "215px";
          this.googleTranslatorVisibility = true;
      } else {
          var gtc = document.getElementById('gtc');
          gtc.style.width = "29px";
          this.googleTranslatorVisibility = false;
      }
  }

  changePic(language: string) {
      var imageToChange = document.getElementById("flag-icon") as HTMLImageElement | null;
      var formattedLanguage = language.replace(/ /g, "-").toLowerCase();

      if (imageToChange != null) {
          imageToChange.src = this.flagAssetsPath + formattedLanguage + "-flag.png";
      }
  }
}
