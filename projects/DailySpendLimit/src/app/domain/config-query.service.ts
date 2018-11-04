import { Injectable } from '@angular/core';
import { DriveFileSearchQuery, DriveMimeTypes, SheetReadQuery } from 'gapi';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigQuery {
  constructor(
    private driveFileSearchQuery: DriveFileSearchQuery,
    private sheetReadQuery: SheetReadQuery,
  ) { }

  execute() {
    return this.driveFileSearchQuery.execute(environment.database, undefined, DriveMimeTypes.Spreadsheet, true).pipe(
      switchMap(searchResult => {
        if (searchResult.length === 0) { return of(new Config()); }

        // tslint:disable-next-line:max-line-length
        return this.sheetReadQuery.execute(searchResult[0].id, 'Config', 'spreadsheetUrl,sheets(properties/sheetId,data(rowData(values/effectiveValue,values/formattedValue)))').pipe(
          map(spreadsheet => {
            const config = new Config();

            config.spreadsheetUrl = spreadsheet.spreadsheetUrl.replace('/edit', '');
            config.configSheetId = spreadsheet.sheets[0].properties.sheetId;
            config.dailyLimit = spreadsheet.sheets[0].data[0].rowData[0].values[1].effectiveValue.numberValue;
            config.effectiveFrom = new Date(spreadsheet.sheets[0].data[0].rowData[1].values[1].formattedValue);

            return config;
          })
        );
      })
    );
  }
}
