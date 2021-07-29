import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGroupMemberModalComponent } from './add-group-member-modal.component';

describe('AddGroupMemberModalComponent', () => {
  let component: AddGroupMemberModalComponent;
  let fixture: ComponentFixture<AddGroupMemberModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupMemberModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGroupMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
