import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Rejects values that are empty once whitespace is stripped. */
export function notBlank(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value !== 'string') {
      return null;
    }
    return value.trim().length === 0 ? { notBlank: true } : null;
  };
}

/** Requires at least `min` non-whitespace characters. */
export function minTrimmedLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }
    const length = value.trim().length;
    return length < min ? { minTrimmedLength: { required: min, actual: length } } : null;
  };
}

/** A stricter e-mail check than Angular's built-in one. */
export function realisticEmail(): ValidatorFn {
  const pattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }
    return pattern.test(value.trim()) ? null : { realisticEmail: true };
  };
}

/** Fails when the whole form still has empty required fields. */
export function allFieldsFilled(fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const missing = fields.filter((field) => {
      const value = group.get(field)?.value;
      return typeof value !== 'string' || value.trim().length === 0;
    });
    return missing.length ? { missingFields: missing } : null;
  };
}
