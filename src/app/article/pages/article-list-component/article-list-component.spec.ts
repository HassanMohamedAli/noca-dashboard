import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list-component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
