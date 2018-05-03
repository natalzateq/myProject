import { Component, OnInit , Input} from '@angular/core';
import { Pet } from '../pet.model';
import { Raza} from '../raza.model';
import { PetService} from '../pet.service';
import { RazaService} from '../raza.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],

})
export class PetsComponent implements OnInit {

  title = 'MASCOTAS';


  data: Observable<Pet[]>;
  pets: Pet[];
  // razas: Raza[];
  razas: any;
  selectedPet: Pet;
  // @Input() pet: Pet;


  constructor(private petService: PetService, private razaService: RazaService) {

  }

  ngOnInit() {
    this.getPets();
    this.getRazas();
  }

  getPets(): void {
    this.petService.getPets()
    .subscribe(pets => this.pets = pets);
  }

  getRazas(): void {
    this.razaService.getRazas()
    .subscribe(razas => this.razas = razas);
    console.log(this.razas);
  }

  getPets1(): void {
    this.data = this.petService.getPets();
  }

  onSelect(pet: Pet): void {
    this.selectedPet = pet;
  }

  add(nombre: string, edad: string, Raza_idRaza: string): void {
    nombre = nombre.trim();
    if (!nombre) { return; }
    const newPet: Pet = {
      id: 0,
      nombre: nombre,
      edad: edad,
      Raza_idRaza: Raza_idRaza

    };
    this.petService.addPet(newPet )
      .subscribe(pet => {
        this.pets.push(pet), location.reload();
      });
  }

  delete(pet: Pet): void {
    if (confirm('Are you sure you want to delete it?')) {
    this.pets = this.pets.filter(p => p !== pet);
    this.petService.deletePet(pet).subscribe();
    }
  }











}

