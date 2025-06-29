import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormModalComponent } from './UserFormModalComponent';
import { FormsModule } from '@angular/forms';


describe('UserFormModalComponent', () => {
  let component: UserFormModalComponent;
  let fixture: ComponentFixture<UserFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormModalComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
