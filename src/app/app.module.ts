import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskSelectorComponent } from './task-selector/task-selector.component';
import { TaskComponent } from './task/task.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { MarkdownModule } from "ngx-markdown";
import { Task1AComponent } from './tasks/1/A/task1-a.component';
import { Task1BComponent } from './tasks/1/B/task1-b.component';
import { RouterModule } from "@angular/router";
import { SummaryComponent } from './summary/summary.component';
import { PreviewComponent } from './preview/preview.component';
import { Task2AComponent } from "src/app/tasks/2/A/task2-a.component";
import { Task2BComponent } from "src/app/tasks/2/B/task2-b.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { CheckSquareOutline, BorderOutline, InboxOutline, FontColorsOutline, UserOutline, UploadOutline } from '@ant-design/icons-angular/icons';
import { NzListModule } from "ng-zorro-antd/list";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { CookieService } from 'ngx-cookie-service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestControllerComponent } from './tasks/1/A/quest-controller/quest-controller.component';
import { QuestCreatorComponent } from './tasks/1/A/quest-creator/quest-creator.component';
import { StaffManagerComponent } from './tasks/1/A/staff-manager/staff-manager.component';
import { QuestSelectorComponent } from './tasks/1/A/quest-selector/quest-selector.component';
import { QuestStatusPipe } from './tasks/1/A/_pipes/quest-status.pipe';
import { QuestModalComponent } from './tasks/1/A/quest-selector/quest-modal/quest-modal.component';
import { CropperModalComponent } from './tasks/1/A/staff-manager/cropper-modal/cropper-modal.component';
import { AdminOnlyDirective } from './tasks/1/A/_directives/admin-only.directive';
import { FileSizePipe } from './tasks/2/B/_pipes/file-size.pipe';
import { HighlightExpDirective } from './tasks/2/B/_directives/highlight-exp.directive';

const zorroModules = [
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzEmptyModule,
  NzDividerModule,
  NzFormModule,
  NzIconModule.forChild([
    BorderOutline,
    CheckSquareOutline,
    InboxOutline,
    FontColorsOutline,
    UserOutline,
    UploadOutline,
  ]),
  NzInputModule,
  NzInputNumberModule,
  NzLayoutModule,
  NzListModule,
  NzMenuModule,
  NzModalModule,
  NzSelectModule,
  NzSplitterModule,
  NzTreeModule,
  NzUploadModule,
]

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NavigatorComponent,
    Task1AComponent,
    Task1BComponent,
    Task2AComponent,
    Task2BComponent,
    TaskSelectorComponent,
    SummaryComponent,
    PreviewComponent,
    QuestControllerComponent,
    QuestCreatorComponent,
    StaffManagerComponent,
    QuestSelectorComponent,
    CropperModalComponent,
    QuestStatusPipe,
    QuestModalComponent,
    AdminOnlyDirective,
    
    FileSizePipe,
    HighlightExpDirective,
  ],
  imports: [
    ...zorroModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    RouterModule,
    ImageCropperComponent,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
