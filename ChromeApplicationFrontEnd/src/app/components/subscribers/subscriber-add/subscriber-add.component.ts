import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriberService } from 'src/app/_services/subscriber.service';

@Component({
  selector: 'app-subscriber-add',
  templateUrl: './subscriber-add.component.html',
  styleUrls: ['./subscriber-add.component.scss']
})
export class SubscriberAddComponent implements OnInit {

  basePathName = "subscribers";
  type = "add";

  subscriberForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  isSubmitted = false;

  constructor(private builder: FormBuilder, private service: SubscriberService, private router: Router) { }

  ngOnInit(): void {
    this.subscriberForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.subscriberForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.subscriberForm.invalid) {
      return;
    }
    this.service.save(this.subscriberForm.value["email"]).subscribe({
      next: data => {
        alert("Subscriber : " + data.email + " created successfully");
        this.router.navigateByUrl("subscribers");
      },
      error: err => {
        alert(err.message);
      }
    })
  }

  onReset(): void {
    this.isSubmitted = false;
    this.subscriberForm.reset();
  }

}
