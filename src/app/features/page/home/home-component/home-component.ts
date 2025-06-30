import { Component, signal } from '@angular/core';
import { SearchbarComponent } from '../../../../shared/components/searchbar/searchbar-component/searchbar-component';
import { CategoryListComponent } from '../../../../shared/components/category-list/category-list-component/category-list-component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card-component/product-card-component';
import { ProductDetailModal } from '../../../../shared/modals/product-detail-modal/product-detail-modal';
import { ProductModel } from '../../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { CartModal } from '../../../../shared/modals/cart-modal/cart-modal';

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [CommonModule, SearchbarComponent, CategoryListComponent, ProductCardComponent, ProductDetailModal, CartModal],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

  selectedProduct = signal<ProductModel | null>(null);
  showCartModal = signal(false); // ⬅️ nuevo signal

  openProductDetail(product: ProductModel) {
    this.selectedProduct.set(product);
  }

  closeProductDetail() {
    this.selectedProduct.set(null);
  }


  openCartModal() {
    this.showCartModal.set(true);
  }
  closeCartModal() {
    this.showCartModal.set(false);
  }

}
