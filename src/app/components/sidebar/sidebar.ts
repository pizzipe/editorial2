import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private readonly MY_BREAKPOINTS = {
    xlarge: '(min-width: 1281px) and (max-width: 1680px)',
    large: '(min-width: 981px) and (max-width: 1280px)',
    medium: '(min-width: 737px) and (max-width: 980px)',
    small: '(min-width: 481px) and (max-width: 736px)',
    xsmall: '(min-width: 361px) and (max-width: 480px)',
    xxsmall: '(max-width: 360px)'
  };


  private breakpointObserver = inject(BreakpointObserver);

  sidebarOpen = signal(false);

  isLarge = toSignal(
    this.breakpointObserver.observe([
      this.MY_BREAKPOINTS.large,
      this.MY_BREAKPOINTS.medium,
      this.MY_BREAKPOINTS.small,
      this.MY_BREAKPOINTS.xsmall,
      this.MY_BREAKPOINTS.xxsmall
    ]).pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );

  isSidebarInactive = computed(() => {
    if (this.isLarge())
      return false;

    return !this.sidebarOpen();
  });


  toggleSidebar(event: Event) {
    event.preventDefault();
    this.sidebarOpen.update(v => !v);
  }
}
