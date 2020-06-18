import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private storage: AngularFireStorage) { }

  public subirArchivo(nombreArchivo: string, datos: any, metadata: any) {
    return this.storage.upload(nombreArchivo, datos, { customMetadata: metadata });
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo).getDownloadURL();
  }

  public exportarExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'informacion': worksheet }, SheetNames: ['informacion'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarExcel(excelBuffer, excelFileName);
  }

  private guardarExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, fileName + '.xlsx');
  }
}
