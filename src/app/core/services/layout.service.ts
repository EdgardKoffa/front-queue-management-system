import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  /**
   * Sidebar desktop
   */
  private readonly sidebarCollapsedSignal = signal(false);

  readonly sidebarCollapsed =
    this.sidebarCollapsedSignal.asReadonly();

  /**
   * Sidebar mobile
   */
  private readonly mobileMenuSignal = signal(false);

  readonly mobileMenuOpen =
    this.mobileMenuSignal.asReadonly();

  toggleSidebar(): void {

    this.sidebarCollapsedSignal.update(
      value => !value
    );

  }

  openSidebar(): void {

    this.sidebarCollapsedSignal.set(false);

  }

  closeSidebar(): void {

    this.sidebarCollapsedSignal.set(true);

  }

  toggleMobileMenu(): void {

    this.mobileMenuSignal.update(
      value => !value
    );

  }

  closeMobileMenu(): void {

    this.mobileMenuSignal.set(false);

  }

}
