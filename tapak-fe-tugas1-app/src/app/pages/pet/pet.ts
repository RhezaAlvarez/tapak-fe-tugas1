import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PetService } from '../../services/pet/pet-service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PetFormModal } from './components/formModal/pet-form-modal/pet-form-modal';
import { Modal } from '../../components/modal/modal';
import { MainService } from '../../services/main-service';
import { Navbar } from "../../components/navbar/navbar/navbar";

@Component({
  selector: 'app-pet',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    PetFormModal,
    Modal,
    Navbar
  ],
  templateUrl: './pet.html',
  styleUrl: './pet.css',
  standalone: true
})
export class Pet implements OnInit {
  pets: any[] = [];
  selectedPet: any = {};
  statusList = ['available', 'pending', 'sold']
  status: string = "available";
  loadingGetAll: boolean = false;

  modalAddOpen: boolean = false;
  modalEditOpen: boolean = false;
  modalDeleteOpen: boolean = false;

  isAdmin = localStorage.getItem('role') === "admin";

  constructor(private readonly petService: PetService, private readonly cd: ChangeDetectorRef, private readonly mainService: MainService) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.loadingGetAll = true;
    this.petService.getPetByStatus(this.status).subscribe({
      next: (res) => {
        this.pets = res;
        this.loadingGetAll = false;
        this.cd.detectChanges();
      },
      complete: () => {
        this.loadingGetAll = false;
      }
    })
  }

  addPet(reqBody: any) {
    this.petService.postPet(reqBody).subscribe({
      next: () => {
        this.getPets();
      },
      error: (err) => {
        console.log('Error Add: ', err)
      },
      complete: () => {
        this.modalAddOpen = false;
      }
    })
  }

  editPet(reqBody: any) {
    this.petService.putPet(reqBody).subscribe({
      next: () => {
        this.getPets();
      },
      error: (err) => {
        console.log('Error Edit: ', err)
      },
      complete: () => {
        this.modalEditOpen = false;
      }
    })
  }

  deletePet() {
    this.petService.deletePet(this.selectedPet.id).subscribe({
      next: () => {
        this.getPets();
      },
      complete: () => {
        this.modalDeleteOpen = false;

      }
    })
  }

  handleClickAdd() {
    this.selectedPet = {};
    this.modalAddOpen = true;
  }

  handleClickEdit(selectedPet: any) {
    this.selectedPet = selectedPet;
    this.modalEditOpen = true;
  }

  handleClickDelete(selectedPet: any) {
    this.selectedPet = selectedPet;
    this.modalDeleteOpen = true;
  }
}
