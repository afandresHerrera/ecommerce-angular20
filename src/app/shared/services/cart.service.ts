import { Injectable, signal, computed } from '@angular/core';
import { ProductModel } from '../models/product.model';

export interface CartItem {
  product: ProductModel;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Computado: lista de productos
  items = computed(() => this.cartItems());

  // Computado: cantidad total de productos
  totalQuantity = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  // Computado: subtotal en precio
  subtotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  // Computado: impuestos (por ejemplo 10%)
  tax = computed(() => this.subtotal() * 0.1);

  // Computado: total final
  total = computed(() => this.subtotal() + this.tax());

  addToCart(product: ProductModel, quantity = 1) {
    const items = [...this.cartItems()];
    const index = items.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      items[index].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.cartItems.set(items);
  }

  removeFromCart(productId: number) {
    const updated = this.cartItems().filter(item => item.product.id !== productId);
    this.cartItems.set(updated);
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      this.removeFromCart(productId)
      return;
    }

    const items = [...this.cartItems()];
    const index = items.findIndex(item => item.product.id === productId);
    if (index > -1) {
      items[index].quantity = quantity;
      this.cartItems.set(items);
    }
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
