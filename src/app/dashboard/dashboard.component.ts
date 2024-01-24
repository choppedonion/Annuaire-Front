import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPersonFormComponent } from '../add-person-form/add-person-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showAddPersonForm = false;

  toggleAddPersonForm() {
    //this.showAddPersonForm = !this.showAddPersonForm;

  const DialogConfig = new MatDialogConfig();
  DialogConfig.autoFocus=true;
  // DialogConfig.width="60%";
  const dialogRef= this.dialog.open(AddPersonFormComponent,{
    width:'45%',
    height:'100%',
    panelClass:'custom-dialog',
    data:{
      
    }
  })
  dialogRef.afterClosed().subscribe(res=>{
  })
  }
  constructor(private dialog: MatDialog) {}

  

}
