import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  /** Small uppercase label above the headline. */
  readonly eyebrow = input('Introducing Posh');
  /** Text before the animated word, e.g. "Create". */
  readonly headlinePrefix = input.required<string>();
  /** Text after the animated word, e.g. "websites". */
  readonly headlineSuffix = input.required<string>();
  /** Words cycled through by the typewriter effect. */
  readonly rotatingWords = input<string[]>(['beautiful', 'stunning', 'modern']);
  readonly subtext = input.required<string>();
  readonly primaryCtaLabel = input('Explore demos');
  readonly secondaryCtaLabel = input('Purchase POSH');
  /** Device mockups shown under the copy. */
  readonly mockups = input<string[]>([]);

  /** The primary CTA reports the click; it does not decide what happens. */
  readonly primaryCtaClicked = output<void>();
  readonly secondaryCtaClicked = output<void>();

  /** The slice of the current word that is currently visible. */
  readonly typedWord = signal('');

  private wordIndex = 0;
  private charIndex = 0;
  private deleting = false;

  ngOnInit(): void {
    const timer = setInterval(() => this.tick(), 110);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  private tick(): void {
    const words = this.rotatingWords();
    if (!words.length) {
      return;
    }

    const word = words[this.wordIndex % words.length];
    this.charIndex += this.deleting ? -1 : 1;
    this.typedWord.set(word.slice(0, this.charIndex));

    if (!this.deleting && this.charIndex === word.length) {
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.wordIndex++;
    }
  }
}
