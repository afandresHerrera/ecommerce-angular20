import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private readonly baseUrl = 'https://fakestoreapi.com';

  // Shared reactive states
  categories = signal<Category[]>([]);
  products = signal<ProductModel[]>([]);
  loading = signal<boolean>(false);
  selectedCategory = signal<string | null>(null);
  searchTerm = signal<string>('');

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const allProducts = this.products();

    if (!term) return allProducts;

    return allProducts.filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    );
  });


  constructor(private http: HttpClient) { }

  /**
   * Gets all categories and maps their icon
   */
  getCategories() {
    this.loading.set(true);
    this.http.get<string[]>(`${this.baseUrl}/products/categories`).subscribe({
      next: (data) => {
        const allCategory: Category = { name: 'All', icon: '📋' };
        const mapped: Category[] = [
          allCategory,
          ...data.map((cat) => ({
            name: cat,
            icon: this.mapCategoryToIcon(cat),
          })),
        ];
        this.categories.set(mapped);
        this.selectedCategory.set('All');
        this.getProducts();
        this.loading.set(false);
      },
      error: () => {
        this.categories.set([]);
        this.loading.set(false);
      },
    });
  }


  /**
   * Gets all products
   */
  getProducts() {
    this.loading.set(true);
    this.http.get<ProductModel[]>(`${this.baseUrl}/products`).subscribe({
      next: (res) => this.products.set(res),
      error: () => this.products.set([]),
      complete: () => this.loading.set(false),
    });
  }

  /**
   * Gets products by category
   */
  getProductsByCategory(category: string) {
    if (category.toLowerCase() === 'all') {
      this.getProducts();
      return;
    }
    this.loading.set(true);
    this.http
      .get<ProductModel[]>(`${this.baseUrl}/products/category/${category}`)
      .subscribe({
        next: (res) => {
          this.products.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.products.set([]);
          this.loading.set(false);
        },
      });
  }

  /**
   * Maps category name to icon
   */
  private mapCategoryToIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'electronics':
        return '📱';
      case 'jewelery':
        return '💎';
      case "men's clothing":
        return '👔';
      case "women's clothing":
        return '👗';
      default:
        return '📦';
    }
  }


}
