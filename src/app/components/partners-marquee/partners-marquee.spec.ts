import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersMarquee } from './partners-marquee';

describe('PartnersMarquee', () => {
  let component: PartnersMarquee;
  let fixture: ComponentFixture<PartnersMarquee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersMarquee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersMarquee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
