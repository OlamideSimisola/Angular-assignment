import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactRequest } from '../../models/contact-request';
import {
  allFieldsFilled,
  minTrimmedLength,
  notBlank,
  realisticEmail,
} from './validators';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  readonly form: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, notBlank(), minTrimmedLength(2)]],
      email: ['', [Validators.required, notBlank(), realisticEmail()]],
      subject: ['', [Validators.required, notBlank(), minTrimmedLength(4)]],
      message: ['', [Validators.required, notBlank(), minTrimmedLength(20)]],
    },
    { validators: allFieldsFilled(['name', 'email', 'subject', 'message']) },
  );

  /** Form status mirrored into a signal so the template can react to it. */
  private readonly status = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });

  /** Drives the disabled state of the submit button. */
  readonly canSubmit = computed(() => this.status() === 'VALID');

  /** Flips to true after a successful submit, revealing the thanks state. */
  readonly submitted = signal(false);

  /** Lets a parent page do something with the message. */
  readonly messageSent = output<ContactRequest>();

  /** A parent can pre-fill the subject, e.g. after a demo card is clicked. */
  readonly subject = input('');

  constructor() {
    effect(() => {
      const subject = this.subject();
      if (subject) {
        this.submitted.set(false);
        this.form.patchValue({ subject });
        this.form.get('subject')?.markAsTouched();
      }
    });
  }

  /** Show an error only once the visitor has actually touched the field. */
  showError(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  errorFor(field: string): string | null {
    const control = this.form.get(field);
    if (!control || !control.errors) {
      return null;
    }
    const errors = control.errors;
    if (errors['required'] || errors['notBlank']) {
      return 'This field is required.';
    }
    if (errors['realisticEmail']) {
      return 'Enter a valid email address, e.g. you@example.com.';
    }
    if (errors['minTrimmedLength']) {
      return `Please use at least ${errors['minTrimmedLength'].required} characters.`;
    }
    return 'Please check this field.';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as ContactRequest;
    this.messageSent.emit({
      name: value.name.trim(),
      email: value.email.trim(),
      subject: value.subject.trim(),
      message: value.message.trim(),
    });

    this.submitted.set(true);
    this.form.reset();
  }

  sendAnother(): void {
    this.submitted.set(false);
  }
}
