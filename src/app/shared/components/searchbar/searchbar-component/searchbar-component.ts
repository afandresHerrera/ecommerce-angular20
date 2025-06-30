import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductApiService } from '../../../services/product-api.service';

@Component({
  selector: 'app-searchbar-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar-component.html',
  styleUrl: './searchbar-component.scss'
})
export class SearchbarComponent {
  keyword: string = '';


  constructor(private _productService: ProductApiService) {
    effect(() => {
      if (this._productService.searchTerm() === '') {
        this.keyword = '';
      }
    });
  }

  onSearch(term: string): void {
    this._productService.searchTerm.set(term);
  }
}
