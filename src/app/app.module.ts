import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PetsDetalleComponent } from './pets-detalle/pets-detalle.component';
import { PetsComponent } from './pets/pets.component';
import { PetService} from './pet.service';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar.component';
import { RazaService} from './raza.service';
import { UsersComponent } from './users/users.component';
import { UserService} from './user.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  declarations: [
    AppComponent,
    PetsDetalleComponent,
    PetsComponent,
    MessagesComponent,
    NavbarComponent,
    UsersComponent
  ],
  providers: [PetService, MessageService, RazaService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }


