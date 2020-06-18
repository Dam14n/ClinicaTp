import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import { Usuario } from '../clases/usuario';
import { Paciente } from '../clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private storage: AngularFireStorage) { }

  exportarExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'informacion': worksheet }, SheetNames: ['informacion'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarExcel(excelBuffer, excelFileName);
  }

  guardarExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, fileName + '.xlsx');
  }
}
