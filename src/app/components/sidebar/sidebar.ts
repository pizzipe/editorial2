import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout'; // Importa il CDK
import { BREAKPOINTS } from '../../models/breakpoints'; // Il tuo file
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements AfterViewInit {
  @ViewChild('sidebarInner') sidebarInner!: ElementRef;

  isInactive: boolean = false;
  openMenus: Set<string> = new Set();

  private breakpointSub!: Subscription;


  constructor(
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver) {
  }


  ngOnInit() {
    // Ascoltiamo in tempo reale i cambiamenti del breakpoint
    this.breakpointSub = this.breakpointObserver
      .observe([BREAKPOINTS.isMobile])
      .subscribe(result => {
        this.isInactive = result.matches;

        if (this.sidebarInner) {
          this.updateStickyBehavior();
        }
      });
  }

  ngOnDestroy() {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }


  ngAfterViewInit() {
    // Il timeout serve a garantire che il browser abbia calcolato le altezze del DOM
    setTimeout(() => this.updateStickyBehavior(), 0);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateStickyBehavior();
  }

  toggleSidebar() {
    this.isInactive = !this.isInactive;
    setTimeout(() => this.updateStickyBehavior(), 100);
  }

  toggleMenu(menuName: string) {
    if (this.openMenus.has(menuName)) {
      this.openMenus.delete(menuName);
    } else {
      // this.openMenus.clear();
      this.openMenus.add(menuName);
    }

    // Essenziale ricalcolare perché l'apertura di un menu allunga la sidebar
    setTimeout(() => this.updateStickyBehavior(), 100);
  }


  /**
   * Logica Core: calcola se la sidebar è più alta dello schermo
   * e applica il 'top' negativo necessario per l'incastro al fondo.
   */
  private updateStickyBehavior() {
    const innerEl = this.sidebarInner?.nativeElement;
    if (!innerEl)
      return;

    // Reset temporaneo degli stili per leggere l'altezza naturale "pulita"
    this.renderer.setStyle(innerEl, 'position', '');
    this.renderer.setStyle(innerEl, 'top', '');

    if (this.isInactive)
      return;


    const sh = innerEl.offsetHeight + 30; // Altezza della sidebar
    const wh = window.innerHeight;   // Altezza della finestra

    if (sh > wh) {
      /**
       * Se la sidebar è più lunga dello schermo: per far sì che l'ultimo elemento arrivi esattamente al fondo dello schermo,
       * il 'top' deve essere la differenza negativa tra finestra e altezza sidebar.
       * Esempio: 800px - 1200px = -400px.
       */
      this.renderer.setStyle(innerEl, 'position', 'sticky');
      this.renderer.setStyle(innerEl, 'top', `${wh - sh}px`);
    } else {
      /**
       * Se la sidebar è più corta dello schermo: la blocchiamo semplicemente in alto.
       */
      this.renderer.setStyle(innerEl, 'position', 'sticky');
      this.renderer.setStyle(innerEl, 'top', '0px');
    }
  }
}
