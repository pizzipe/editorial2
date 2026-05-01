import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BREAKPOINTS } from '../../models/breakpoints';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private breakpointObserver = inject(BreakpointObserver);


  private isOpen = signal(true);

  private isAtMostLarge = toSignal(
    this.breakpointObserver.observe([
      BREAKPOINTS.large,
      BREAKPOINTS.medium,
      BREAKPOINTS.small,
      BREAKPOINTS.xsmall,
      BREAKPOINTS.xxsmall
    ]).pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );


  isInactive = computed(() => {
    return !this.isOpen();
  });


  constructor() {
    effect(() => {
      if (this.isAtMostLarge())
        this.isOpen.set(false);
    });
  }


  toggle(event: Event) {
    event.preventDefault();
    this.isOpen.update(v => !v);
  }
}
