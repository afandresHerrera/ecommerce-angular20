
import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.scss'
})
export class ProductDetailModal {
  private cartService = inject(CartService);

  @Input() product!: ProductModel;
  @Output() close = new EventEmitter<void>();
  @Output() openCart = new EventEmitter<void>();


  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize = signal('S');
  quantity: number = 1;

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
    this.close.emit();
    this.openCart.emit();
  }


  selectSize(size: string) {
    this.selectedSize.set(size);
  }

}
