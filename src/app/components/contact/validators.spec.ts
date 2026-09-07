import { FormControl, FormGroup } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import {
  allFieldsFilled,
  minTrimmedLength,
  notBlank,
  realisticEmail,
} from './validators';

describe('notBlank', () => {
  it('rejects whitespace-only values', () => {
    expect(notBlank()(new FormControl('   '))).toEqual({ notBlank: true });
  });

  it('accepts real text', () => {
    expect(notBlank()(new FormControl('Lamlam'))).toBeNull();
  });
});

describe('minTrimmedLength', () => {
  it('counts characters after trimming', () => {
    expect(minTrimmedLength(4)(new FormControl('  ab  '))).toEqual({
      minTrimmedLength: { required: 4, actual: 2 },
    });
    expect(minTrimmedLength(4)(new FormControl('  abcd  '))).toBeNull();
  });

  it('leaves empty values to the required validator', () => {
    expect(minTrimmedLength(4)(new FormControl(''))).toBeNull();
  });
});

describe('realisticEmail', () => {
  it('needs a dotted domain', () => {
    expect(realisticEmail()(new FormControl('lamlam@example'))).toEqual({
      realisticEmail: true,
    });
    expect(realisticEmail()(new FormControl('lamlam@example.com'))).toBeNull();
  });
});

describe('allFieldsFilled', () => {
  const build = (name: string, email: string) =>
    new FormGroup(
      { name: new FormControl(name), email: new FormControl(email) },
      { validators: allFieldsFilled(['name', 'email']) },
    );

  it('names the fields that are still empty', () => {
    expect(build('Lamlam', '  ').errors).toEqual({ missingFields: ['email'] });
  });

  it('passes once every field has content', () => {
    expect(build('Lamlam', 'lamlam@example.com').errors).toBeNull();
  });
});
