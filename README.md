# AGoogTrans
An Angular V15 Translate Widget Library made using Google Translate's open-source API that is <b>currently only supporting Angular Version 15</b> which is now accessible at <a href="https://www.npmjs.com/package/a-goog-trans" target="_blank">npmjs</a>. 

## Table of Contents
<ul>
  <li><a href="#live-demo">Live Demo</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#currently-supported-languages">Currently Supported Languages</a></li>
  <li><a href="#sample-code">Sample Code</a></li>
  <li><a href="#options">Options</a></li>
  <li><a href="#create-your-own">Project Configurations</a></li>
  <li><a href="#improvement-checklist">Improvement Checklist</a></li>
  <li><a href="#useful-reference-documentation">Useful Reference Documentation</a></li>
</ul>

## Live Demo
<video width="100%" height="auto" autoplay loop>
  <source src="live-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features 
<ul>
  <li>Translate Language</li>
  <li>Display Translated Language's Flag</li>
</ul> 

## Install
```
npm install a-goog-trans
```

## Currently Supported Languages
| Language          | Language Code |
| :---:             | :---:         |
| English           | en            |
| Filipino          | tl            |
| Hindi             | hi            |
| Indonesian        | id            |
| Japanese          | ja            |
| Korean            | ko            |
| Malay             | ms            |
| Chinese (PRC)     | zh-CN         |
| Thai              | th            |
| Chinese (TW)      | zh-TW         |
| Vietnamese        | vi            |

## Sample Code
<b>app.module</b>
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AGoogTransModule } from 'a-goog-trans';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AGoogTransModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

<b>app.component.ts</b>
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  languageToInclude: any = "";
  defaultLanguage: any = "en";
  domainName: any = "";
}
```

<b>app.component.html</b>
```
<a-goog-trans [languagesToInclude]="languagesToInclude" [defaultLanguage]="defaultLanguage" [domainName]="domainName"></a-goog-trans>
```

<b>angular.json (assets for build and testing)</b>
```
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/a-goog-trans/src/assets",
    "output": "/assets/"
  }
],
```

## Options
| Input Variables    | Default Value                          |
| :---:              | :---:                                  |
| languagesToInclude | en,tl,id,ja,ko,ms,zh-CN,hi,th,zh-TW,vi |
| defaultLanguage    | en                                     |
| domainName         | localhost                              |
<ul>
<li>To customize "languagesToInclude", just add the <a href="#currently-supported-languages">language code</a>, i.e. "en,tl,id" with no spaces. </li>
<li>To customize "defaultLanguage, just put in a single language code, i.e. "en". </li>
<li>To customize "domainName", for development, use "localhost" and for deployment or production, use your website's domain name. </li>
</ul>

## Improvement Checklist
| Task | Last Modified | Status |
| :---:   | :---: | :---: |
| Add Usage Details | 10/07/2023   | Completed   |
| Add More Language Flags | 10/07/2023   | Pending   |
| Angular Versionings | 30/01/2023   | TBC   |

## Create Your Own
<p>
  You can create your own Google Translator Widget by following the basic codes for the Google Translator Widget is accessible via (which is manually clonable at <a     href="https://www.w3schools.com/howto/howto_google_translate.asp" target="_blank">W3Schools Tutorial</a>. As for the styling of the widget, you can refer to <a         href="#useful-reference-documentation">Useful Reference Documentation's</a> links to find for relevant information.
</p>

## Useful Reference Documentation
<ol>
  <li> https://developers.google.com/admin-sdk/directory/v1/languages </li>
  <li> https://www.w3schools.com/howto/howto_google_translate.asp </li>
  <li> https://stackoverflow.com/questions/27935450/detect-google-website-translator-change-of-language </li>
  <li> https://stackoverflow.com/questions/6633127/can-you-style-the-google-translate-plugin </li>
</ol>

## License
<a href="MIT.txt">MIT ©</a> <a href="https://www.heysia.dev" target="_blank">Sia-WRWD</a>

<br/>

<a href="#agoogtrans">Back to Top</a>
