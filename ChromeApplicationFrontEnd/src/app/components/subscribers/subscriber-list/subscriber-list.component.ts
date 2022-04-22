import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriberService } from 'src/app/_services/subscriber.service';

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.scss'],
})
export class SubscriberListComponent implements OnInit {

  basePathName = "subscribers";
  type = "list";
  currentListType = "";
  subscribers?: Array<any>;
  closeResult: string = '';
  editForm: FormGroup = new FormGroup({});

  constructor(private service: SubscriberService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentListType = "PENDING";
    this.updateSubscriberList();
    this.setForm();
  }

  onSubscriberTypeChange(e: any) {
    this.currentListType = e.target.id?.toUpperCase();
    this.updateSubscriberList();
  }

  updateSubscriberList() {
    this.service.getByApprovalStatus(this.currentListType).subscribe({
      next: data => {
        this.subscribers = data;
      },
      error: err => {
        alert(err.message)
      }
    })
  }

  formatDate(isoDate: any): string {
    if (isoDate) {
      var date = new Date(isoDate);
      const dateFormat = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      return dateFormat;
    }
    return "";
  }

  open(content: any, subscriber: any) {
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (base64regex.test(subscriber.password)) subscriber.password = atob(subscriber.password)
    this.editForm.patchValue(subscriber)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  setForm() {
    this.editForm = this.formBuilder.group({
      _id: new FormControl('', [Validators.required]),
      password: new FormControl({ value: Math.random().toString(36).slice(2), disabled: true }),
      txtFullName: new FormControl('', [Validators.required]),
      txtCity: new FormControl('', [Validators.required]),
      txtEmail: new FormControl('', [Validators.required, Validators.email]),
      txtTelephoneNo: new FormControl('', [Validators.required]),
      primaryLink: new FormControl('', [Validators.required]),
      secondaryLink: new FormControl(''),
      timeoutInSeconds: new FormControl(60, [Validators.required, Validators.min(10), Validators.max(60)]),
      approvalStatus: ''
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  updateSubscriberApprovalStatus(approvalStatus: string) {
    this.editForm.patchValue({ approvalStatus })
    this.service.update(this.editForm.getRawValue()).subscribe(data => {
      this.updateSubscriberList();
      alert(data.message)
      this.modalService.dismissAll();
    });
  }

  generateRandomPassword() {
    this.editForm.patchValue({ password: Math.random().toString(36).slice(2) })
  }
}
