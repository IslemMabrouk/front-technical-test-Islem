import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../models/file-item';

interface FileTypeInfo {
    icon: string;
    color: string;
    preview: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-file-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.card-folder]="file.folder" (click)="onClick(file)">
      <div class="card-preview" [style.backgroundColor]="fileTypeInfo.color + '15'">
        <!-- Image Preview -->
        @if (previewUrl) {
          <img [src]="previewUrl" [alt]="file.name" class="card-preview-image">
        }
        <!-- Icon Fallback -->
        @if (!previewUrl) {
          <span class="material-symbols-outlined card-icon icon-filled" [style.color]="fileTypeInfo.color">
            {{ fileTypeInfo.icon }}
          </span>
        }
      </div>

      <div class="card-content">
        <h3 class="card-title">{{ file.name }}</h3>
        <p class="card-meta" *ngIf="!file.folder">{{ file.mimeType }}</p>
        <p class="card-date">{{ file.modification | date:'MMM d, y' }}</p>
      </div>

      <div class="card-actions">
        <button class="card-action-btn" *ngIf="!file.folder" (click)="onDownload($event, file)" title="Download">
          <span class="material-symbols-outlined">download</span>
        </button>
        <button class="card-action-btn" (click)="onRename($event, file)" title="Rename">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="card-action-btn card-action-btn-danger" (click)="onDelete($event, file)" title="Delete">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {
  private _file!: FileItem;
  private _fileTypeInfo!: FileTypeInfo;
  private _previewUrl: string | null = null;
  
  @Input({ required: true })
  set file(value: FileItem) {
    if (value !== this._file) {
      this._file = value;
    }
  }
  get file(): FileItem {
    return this._file;
  }

  @Input({ required: true })
  set fileTypeInfo(value: FileTypeInfo) {
    if (value !== this._fileTypeInfo) {
      this._fileTypeInfo = value;
    }
  }
  get fileTypeInfo(): FileTypeInfo {
    return this._fileTypeInfo;
  }

  @Input()
  set previewUrl(value: string | null) {
    if (value !== this._previewUrl) {
      this._previewUrl = value;
    }
  }
  get previewUrl(): string | null {
    return this._previewUrl;
  }
  
  @Output() readonly fileClick = new EventEmitter<FileItem>();
  @Output() readonly download = new EventEmitter<FileItem>();
  @Output() readonly rename = new EventEmitter<FileItem>();
  @Output() readonly delete = new EventEmitter<FileItem>();

  onClick(file: FileItem): void {
    this.fileClick.emit(file);
  }

  onDownload(event: Event, file: FileItem): void {
    event.stopPropagation();
    this.download.emit(file);
  }

  onRename(event: Event, file: FileItem): void {
    event.stopPropagation();
    this.rename.emit(file);
  }

  onDelete(event: Event, file: FileItem): void {
    event.stopPropagation();
    this.delete.emit(file);
  }
}