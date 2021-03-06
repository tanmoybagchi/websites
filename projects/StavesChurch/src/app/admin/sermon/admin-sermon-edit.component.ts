import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorFocusService, EventManagerService, Result } from 'core';
import { AssetUploader, ASSET_UPLOADER, PageEditBase, PageIdQuery, PageUpdateCommand } from 'material-cms-admin';
import { SitePages, SITE_PAGES } from 'material-cms-view';
import { HideThrobberEvent, ShowThrobberEvent } from 'mh-throbber';
import { catchError, finalize, map } from 'rxjs/operators';
import { AdminSermon } from './admin-sermon';
import { AdminSermonApprovalRules } from './admin-sermon-approval-rules';

@Component({
  templateUrl: './admin-sermon-edit.component.html'
})
export class AdminSermonEditComponent extends PageEditBase<AdminSermon> {
  file: File;
  modelCreator = AdminSermon;
  protected approvalRules = new AdminSermonApprovalRules();

  constructor(
    @Inject(ASSET_UPLOADER) private assetUploader: AssetUploader,
    @Inject(SITE_PAGES) sitePages: SitePages,
    errorFocusService: ErrorFocusService,
    eventManagerService: EventManagerService,
    pageIdQuery: PageIdQuery,
    pageUpdateCommand: PageUpdateCommand,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(sitePages, eventManagerService, errorFocusService, pageIdQuery, pageUpdateCommand, route, router);
  }

  onEffectiveFromChange($event) {
    this.model.effectiveFrom = $event;
    this.saveStream.next();
  }

  onTitleChange($event) {
    this.model.content.title = $event;
    this.saveStream.next();
  }

  onFiles(files: FileList) {
    if (!files.length) {
      return;
    }

    this.file = files[0];

    if (!this.isValidFiletype(this.file)) {
      const result = new Result();
      result.addError('This is not an audio file.');
      this.errors = result.errors;
      return;
    }

    this.eventManagerService.raise(ShowThrobberEvent);

    this.assetUploader.uploadAudio(this.file).pipe(
      map(x => this.onUpload(x)),
      catchError(err => this.onError(err)),
      finalize(() => this.eventManagerService.raise(HideThrobberEvent))
    ).subscribe();
  }

  private onUpload(x: AssetUploader.Result) {
    this.model.content.title = this.file.name;
    this.model.content.location = x.location.replace('&export=download', '');
    this.saveStream.next();
  }

  private isValidFiletype(file: File) {
    return file.type.startsWith('audio');
  }
}
