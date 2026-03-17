import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatButtonModule
} from '@angular/material/button';

@Component({
  selector: 'app-pet-form-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './pet-form-modal.html',
  styleUrl: './pet-form-modal.css',
})
export class PetFormModal implements OnChanges {

  @Input() value: any = {};
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  form: any = this.getEmptyForm();

  statusOptions = ['available', 'pending', 'sold'];

  newCategoryName: string = '';
  categoryOptions = [
    { id: 1, name: 'Dog' },
    { id: 2, name: 'Cat' },
    { id: 3, name: 'Fish' },
    { id: 4, name: 'Bird' },
    { id: 5, name: 'Reptile' },
  ];

  newTagName: string = '';
  tagOptions = [
    { id: 1, name: 'Cute' },
    { id: 2, name: 'Aggressive' },
    { id: 3, name: 'Small' },
    { id: 4, name: 'Big' },
    { id: 5, name: 'Rare' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value) {
      this.form = {
        ...this.getEmptyForm(),
        ...this.value
      };
    }
  }

  getEmptyForm() {
    return {
      id: 0,
      name: '',
      status: 'available',
      category: { id: this.generateId(), name: '' },
      photoUrls: [''],
      tags: []
    };
  }
  updateCategoryName(value: string) {
    this.form.category = {
      id: this.form.category?.id || this.generateId(),
      name: value
    };
  }

  addTag() {
    this.form.tags.push({
      id: this.generateId(),
      name: ''
    });
  }

  removeTag(index: number) {
    this.form.tags.splice(index, 1);
  }

  updateTagName(index: number, value: string) {
    this.form.tags[index] = {
      id: this.form.tags[index]?.id || this.generateId(),
      name: value
    };
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000000);
  }

  handleSubmit() {
    const payload = {
      ...this.form,
      id: this.form.id || this.generateId(),
      category: {
        id: this.form.category?.id || this.generateId(),
        name: this.form.category?.name
      },
      tags: this.form.tags.map((t: any) => ({
        id: t.id || this.generateId(),
        name: t.name
      }))
    };

    this.onSubmit.emit(payload);
    this.handleClose();
  }

  handleClose() {
    this.form = this.getEmptyForm();
    this.onClose.emit();
  }

  addPhotoUrl() {
    this.form.photoUrls.push('');
  }

  removePhotoUrl(index: number) {
    this.form.photoUrls.splice(index, 1);
  }
}