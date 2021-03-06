import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from '@app/app-routes';
import { environment as env } from '@env/environment';
import { CoreModule, LogLevel } from 'core';
import { GapiModule } from 'gapi';
import { GSheetsPageDatabase, MaterialCmsProvidersModule } from 'material-cms-providers';
import { MaterialCmsViewModule } from 'material-cms-view';
import { AboutUsModule } from './about-us/about-us.module';
import { AppRootComponent } from './app-root/app-root.component';
import { AppRootModule } from './app-root/app-root.module';
import { EventsModule } from './events/events.module';
import { HomepageModule } from './homepage/homepage.module';
import { SecurityModule } from './security/security.module';
import { MySitePages } from './shared/my-site-pages';
import { SharedModule } from './shared/shared.module';
import { WinesModule } from './wines/wines.module';
// import { GSheetsPageDatabase } from './shared/gsheets-page-database.service';

@NgModule({
  declarations: [],
  imports: [
    // The first two modules need to be BrowserAnimationsModule and SharedModule.
    BrowserAnimationsModule,
    SharedModule,
    AboutUsModule,
    AppRootModule,
    CoreModule.forRoot({ keyPrefix: 'VinesToWinesDM' }, { logLevel: LogLevel.Warn }),
    EventsModule,
    GapiModule.forRoot({ id: env.g_serviceaccount_id, password: env.g_serviceaccount_key, scope: env.g_serviceaccount_scope }),
    HomepageModule,
    // MaterialCmsProvidersModule MUST come before MaterialCmsViewModule.
    MaterialCmsProvidersModule.forRoot({
      audioFolder: env.audioFolder,
      docFolder: env.docFolder,
      g_drive_database: env.database,
      g_oauth_login_name: env.g_oauth_login_name,
      g_sheets_database: env.database,
      photoFolder: env.photoFolder,
    }),
    MaterialCmsViewModule.forRoot(MySitePages, GSheetsPageDatabase),
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    SecurityModule,
    WinesModule,
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
