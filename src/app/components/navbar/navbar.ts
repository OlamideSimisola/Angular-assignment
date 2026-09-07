import { Component, HostListener, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../models/nav-link';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly demoService = inject(DemoService);

  readonly logo = 'https://prium.github.io/Posh/v2.1.0/assets/images/posh-logo.png';

  /** Homes / Pages / Components / Docs — from data, not hand-written markup. */
  readonly items: NavItem[] = this.demoService.getNavItems();

  /** Mobile hamburger state. */
  readonly menuOpen = signal(false);

  /** Label of the top-level dropdown that is currently open, if any. */
  readonly openDropdown = signal<string | null>(null);

  /** Label of the open submenu inside the Pages dropdown. */
  readonly openSubmenu = signal<string | null>(null);

  /** Lets the shell react when the mobile menu is toggled. */
  readonly menuToggled = output<boolean>();

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    if (!this.menuOpen()) {
      this.closeDropdowns();
    }
    this.menuToggled.emit(this.menuOpen());
  }

  /**
   * Desktop opens dropdowns on hover, like the original. Touch and narrow
   * screens have no hover, so there the same signals are driven by clicks.
   */
  private get hoverOpens(): boolean {
    return window.matchMedia('(hover: hover) and (min-width: 992px)').matches;
  }

  onItemEnter(label: string): void {
    if (this.hoverOpens) {
      this.openDropdown.set(label);
      this.openSubmenu.set(null);
    }
  }

  onItemLeave(): void {
    if (this.hoverOpens) {
      this.closeDropdowns();
    }
  }

  onGroupEnter(label: string): void {
    if (this.hoverOpens) {
      this.openSubmenu.set(label);
    }
  }

  onGroupLeave(): void {
    if (this.hoverOpens) {
      this.openSubmenu.set(null);
    }
  }

  toggleDropdown(label: string): void {
    this.openDropdown.update((open) => (open === label ? null : label));
    this.openSubmenu.set(null);
  }

  toggleSubmenu(label: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openSubmenu.update((open) => (open === label ? null : label));
  }

  closeDropdowns(): void {
    this.openDropdown.set(null);
    this.openSubmenu.set(null);
  }

  /** Called after any link is followed: collapse everything. */
  closeAll(): void {
    this.closeDropdowns();
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.menuToggled.emit(false);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const host = event.target as HTMLElement;
    if (!host.closest('app-navbar')) {
      this.closeDropdowns();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }
}
