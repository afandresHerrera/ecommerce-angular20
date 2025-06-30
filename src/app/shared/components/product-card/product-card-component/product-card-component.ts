import { CommonModule } from '@angular/common';
import { Component, computed, effect, EventEmitter, inject, Output } from '@angular/core';
import { ProductApiService } from '../../../services/product-api.service';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.scss',
})
export class ProductCardComponent {
  @Output() openDetail = new EventEmitter<any>();
  private _productService = inject(ProductApiService);
  selectedTab = 'top';
  products = this._productService.filteredProducts;
  loading = this._productService.loading;
  liked = false;
  likedProducts = new Set<number>();

  constructor() {
    effect(() => {
      console.log('PRODUCTOS ACTUALIZADOS:', this.products());
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  toggleLike(index: number, event: MouseEvent): void {
    event.stopPropagation();
    if (this.likedProducts.has(index)) {
      this.likedProducts.delete(index);
    } else {
      this.likedProducts.add(index);
    }
  }

  isLiked(index: number): boolean {
    return this.likedProducts.has(index);
  }

  handleOpen(product: any) {
    this.openDetail.emit(product);
  }
}
