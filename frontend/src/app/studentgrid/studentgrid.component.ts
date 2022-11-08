import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { DataBindingDirective, GridComponent } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { State } from "@progress/kendo-data-query";
import { GridDataResult, PageChangeEvent,  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent, } from "@progress/kendo-angular-grid";
import { StudentDetailsService } from "./studentgrid.service";
import { GraphqlService } from "../graphql.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-studentgrid',
  templateUrl: './studentgrid.component.html',
  styleUrls: ['./studentgrid.component.css']
})
export class StudentgridComponent implements OnInit {
//  @ViewChild(DataBindingDirective) dataBinding:any= DataBindingDirective;
  public view:any;
  public state: State = {
    skip: 0,
    take: 25,
  };
  public searchstring:string=""
  private editedRowIndex: number;
  // public gridData:any=[]
  editedProduct: any;
  public formGroup: FormGroup;

  constructor(private service:StudentDetailsService,private graphQLService:GraphqlService) { 
    this.view= service
    this.service.query(this.state,this.searchstring);
  }

  ngOnInit(): void {
  }



  public pageChange(state: PageChangeEvent): void {
    console.log("page change state",state)
    this.state.skip = state.skip;
    this.service.query(state,this.searchstring);
  }
  
  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    // `editService` in this example
    this.graphQLService.deleteStudent(args.dataItem.id).subscribe((f:any)=>{
      console.log(f)
      this.service.query(this.state,this.searchstring);
    })
    console.log(args.dataItem);
  }

  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      first_name: new FormControl(dataItem.first_name),
      last_name: new FormControl(dataItem.last_name),
      email: new FormControl(dataItem.email),
      date_of_birth: new FormControl(dataItem.date_of_birth),
      age: new FormControl(dataItem.age),
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    //const product: Product[] = formGroup.value;

    //this.editService.save(product, isNew);
    console.log("Save",formGroup.value,isNew,rowIndex,sender)
    console.log(formGroup.value)
    this.graphQLService.updateStudent(formGroup.value).subscribe((f:any)=>{
      this.service.query(this.state,this.searchstring);
      console.log(f)
    })

    sender.closeRow(rowIndex);
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    // this.formGroup = new FormGroup({
    //   ProductID: new FormControl(),
    //   ProductName: new FormControl("", Validators.required),
    //   UnitPrice: new FormControl(0),
    //   UnitsInStock: new FormControl(
    //     "",
    //     Validators.compose([
    //       Validators.required,
    //       Validators.pattern("^[0-9]{1,3}"),
    //     ])
    //   ),
    //   Discontinued: new FormControl(false),
    // });
    args.sender.addRow(this.formGroup);
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    // close the editor
    grid.closeRow(rowIndex);
    // revert the data item to original state
    // this.editService.resetItem(this.editedProduct);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }
  
  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }
  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;
    console.log(inputValue)
    this.searchstring=inputValue
    this.service.query(this.state,inputValue);
    this.state.skip=0
    // process(this.view, {
    //   filter: {
    //     logic: "or",
    //     filters: [
    //       {
    //         field: "first_name",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "last_name",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "email",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "date_of_birth",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "age",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //     ],
    //   },
    // }).data;

 //  this.dataBinding.skip = 0;
  }
}
