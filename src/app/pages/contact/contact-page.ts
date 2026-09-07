import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Contact } from '../../components/contact/contact';
import { ContactRequest } from '../../models/contact-request';

@Component({
  selector: 'app-contact-page',
  imports: [Contact],
  templateUrl: './contact-page.html',
})
export class ContactPage {
  private readonly route = inject(ActivatedRoute);

  /**
   * A demo card links here with ?subject=…, so the form opens already naming
   * the demo the visitor clicked.
   */
  readonly subject = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('subject') ?? '')),
    { initialValue: '' },
  );

  onMessageSent(_request: ContactRequest): void {
    // The form shows its own confirmation; nothing further to do here.
  }
}
