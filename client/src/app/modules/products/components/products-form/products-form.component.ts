import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public categoriesDatas: Array<GetCategoriesResponse> = [];

  public addProductsForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });
  public selectedCategory: Array<{ name: string; code: string }> = [];

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  handleSubmitAddProduct(): void {
    if (this.addProductsForm.value && this.addProductsForm.valid) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductsForm.value.name as string,
        price: this.addProductsForm.value.price as string,
        description: this.addProductsForm.value.description as string,
        category_id: this.addProductsForm.value.category_id as string,
        amount: Number(this.addProductsForm.value.amount),
      };
      this.productsService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto criado com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail:
                'Ocorreu um erro ao criar o produto! Por favor, tente mais tarde!',
              life: 2500,
            });
          },
        });
    }
    this.addProductsForm.reset();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
