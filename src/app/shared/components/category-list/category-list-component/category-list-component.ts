import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { ProductApiService } from '../../../services/product-api.service';

@Component({
  selector: 'app-category-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.scss',
})
export class CategoryListComponent {
  private _productService = inject(ProductApiService);
  categories = this._productService.categories;
  loading = this._productService.loading;
  selectedCategory = this._productService.selectedCategory;

  constructor() {
    this._productService.getCategories();
  }

  selectCategory(name: string) {
    this.selectedCategory.set(name);
    this._productService.searchTerm.set('');
    this._productService.getProductsByCategory(name);
  }
}
