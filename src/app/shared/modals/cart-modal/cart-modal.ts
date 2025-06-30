import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-modal.html',
  styleUrl: './cart-modal.scss'
})
export class CartModal {
  public cartService = inject(CartService);
  cartItems = this.cartService.items;
  subtotal = this.cartService.subtotal;
  tax = this.cartService.tax;
  total = this.cartService.total;

  @Output() close = new EventEmitter<void>();

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  buyAll() {
    alert('¡Compra realizada exitosamente!');
    this.cartService.clearCart();
    this.close.emit();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateQuantity(productId, quantity);
  }
}