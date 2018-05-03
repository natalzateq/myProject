import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../pet.model';
import { Raza } from '../raza.model';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PetService } from '../pet.service';
import { RazaService } from '../raza.service';

@Component({
  selector: 'app-pets-detalle',
  templateUrl: './pets-detalle.component.html',
  styleUrls: ['./pets-detalle.component.css']
})
export class PetsDetalleComponent implements OnInit {

  @Input() pet: Pet;
  // razas: Raza[];
  razas: any;

  constructor( private route: ActivatedRoute,
    private petService: PetService,
    private razaService: RazaService,
    private location: Location) { }

  ngOnInit() {
    this.getPet();
    this.getRazas();
  }

  getPet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.petService.getPet(id)
      .subscribe(pet => this.pet = pet);
  }

  getRazas() {
    this.razaService.getRazas()
    .subscribe(razas => this.razas = razas);
    console.log(this.razas);
  }


  save(): void {
    console.log(this.pet);
    this.petService.updatePet(this.pet)
      .subscribe(() => this.goBack());
  }



  goBack(): void {
    this.location.back();
  }



}
