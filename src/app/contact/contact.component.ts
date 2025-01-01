import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common'; 
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [ReactiveFormsModule, NgIf, NgFor], 
  standalone: true,
})
export class ContactComponent implements OnInit {
  reactiveForm!: FormGroup;
  isSubmitted = false;
  isSuccess: boolean | null = null;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[6789][0-9]{9}'), 
      ]),
      query: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  OnFormSubmitted() {
    if (this.reactiveForm.valid) {
      const serviceId = 'service_55txx8h';
      const templateId = 'template_r5v6f4q';
      const publicKey = '36zFKeM31-dToyMnt'; 

      emailjs
        .sendForm(serviceId, templateId, document.querySelector('form')!, {
          publicKey: publicKey,
        })
        .then(
          (response: any) => {
            this.isSuccess = true;
            this.isSubmitted = true;
            this.reactiveForm.reset();
          },
          (error: any) => {
            console.error('Email failed:', error);
            this.isSuccess = false;
            this.isSubmitted = true;
          }
        );
    }
  }
}