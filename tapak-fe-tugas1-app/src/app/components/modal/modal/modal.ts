import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() openModal: boolean = false;
  @Input() title: string = "";

  @Output() openModalChange = new EventEmitter<boolean>();

  handleOpenModal() {
    this.openModal = !this.openModal;
    this.openModalChange.emit(this.openModal);
  }
}
