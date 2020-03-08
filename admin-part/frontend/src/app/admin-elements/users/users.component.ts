import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public closeResult: string;

  constructor(private modalService: NgbModal) {}


  displayedColumns: string[] = ['position', 'name', 'weight','action'];
  

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  openCreate(contentCreate) {
    console.log(contentCreate);

    this.modalService.open(contentCreate, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }


  openEdit(contentEdit) {
    console.log(contentEdit);

    this.modalService.open(contentEdit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }


  openDelete(contentDelete) {

    this.modalService.open(contentDelete, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  

}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  action:string;
}




const ELEMENT_DATA: PeriodicElement[] = [
{position: 1, name: 'Hydrogen', weight: 1.0079, action: ''},
{position: 2, name: 'Helium', weight: 4.0026, action: ''},
{position: 3, name: 'Lithium', weight: 6.941, action: ''},
{position: 4, name: 'Beryllium', weight: 9.0122, action: ''},
{position: 5, name: 'Boron', weight: 10.811, action: ''},
{position: 6, name: 'Carbon', weight: 12.0107, action: ''},
{position: 7, name: 'Nitrogen', weight: 14.0067, action: ''},
{position: 8, name: 'Oxygen', weight: 15.9994, action: ''},
{position: 9, name: 'Fluorine', weight: 18.9984, action: ''},
{position: 10, name: 'Neon', weight: 20.1797, action: ''},
{position: 11, name: 'Sodium', weight: 22.9897, action: ''},
{position: 12, name: 'Magnesium', weight: 24.305, action: ''},
{position: 13, name: 'Aluminum', weight: 26.9815, action: ''},
{position: 14, name: 'Silicon', weight: 28.0855, action: ''},
{position: 15, name: 'Phosphorus', weight: 30.9738, action: ''},
{position: 16, name: 'Sulfur', weight: 32.065, action: ''},
{position: 17, name: 'Chlorine', weight: 35.453, action: ''},
{position: 18, name: 'Argon', weight: 39.948, action: ''},
{position: 19, name: 'Potassium', weight: 39.0983, action: ''},
{position: 20, name: 'Calcium', weight: 40.078, action: ''},
];




