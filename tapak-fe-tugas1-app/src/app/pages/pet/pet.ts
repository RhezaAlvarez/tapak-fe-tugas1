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
    MatProgressSpinnerModule
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

  modalDeleteOpen: boolean = false;

  constructor(private readonly petService: PetService, private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.loadingGetAll = true;
    this.petService.getPetByStatus(this.status).subscribe({
      next: (res) => {
        this.pets = res;
        this.cd.detectChanges();
      },
      complete: () => {
        this.loadingGetAll = false;
      }
    })
  }

  deletePet() {
    this.petService.deletePet(this.status).subscribe({
      next: () => {
        this.getPets();
      },
      complete: () => {
        this.modalDeleteOpen = false;

      }
    })
  }

  handleClickDelete(selectedPet: any) {
    this.selectedPet(selectedPet);
    this.modalDeleteOpen = true;
  }
}
