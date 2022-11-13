import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent implements OnInit {
  langs: string[] = this.translate.getLangs();
  currentLang = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
