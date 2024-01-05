import { Component } from '@angular/core';
import { IPersona } from 'src/app/interfaces/persona.interfaces';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  rows: IPersona[] = [];
  sheet: XLSX.WorkSheet | undefined = undefined;
  chooseFileLabel: string = 'Seleccione un archivo';

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    this.chooseFileLabel = target.files[0].name;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      this.sheet = wb.Sheets[wsname];
      this.rows = XLSX.utils.sheet_to_json<IPersona>(this.sheet);
    };
  }

  onDeleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}
