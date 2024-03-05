import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule } from '../../translation.module';
import { LanguageTogglerComponent } from './language-toggler.component';

describe('LanguageTogglerComponent', () => {
  let component: LanguageTogglerComponent;
  let fixture: ComponentFixture<LanguageTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageTogglerComponent],
      imports: [HttpClientTestingModule, MatMenuModule, MatIconModule, NoopAnimationsModule, TranslationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
