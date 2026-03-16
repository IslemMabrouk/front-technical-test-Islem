import {
	Component,
	EventEmitter,
	Input,
	Output,
	ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../models/file-item';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush, // 🚀 Performance optimization
	template: `
		<aside class="sidebar">
			<!-- Logo/Brand -->
			<div class="sidebar-header">
				<div
					class="logo-container"
					(click)="folderSelect.emit(null)"
					role="button"
					tabindex="0"
					(keydown.enter)="folderSelect.emit(null)">
					<div class="logo-icon">
						<span class="material-symbols-outlined icon-filled">folder_open</span>
					</div>
					<span class="logo-text">FileHub</span>
				</div>
			</div>

			<!-- Main Actions -->
			<div class="sidebar-actions">
				<input
					#fileInput
					type="file"
					multiple
					(change)="onFilesSelected($event)"
					style="display: none" />
				<input
					#folderInput
					type="file"
					webkitdirectory
					(change)="onFolderSelected($event)"
					style="display: none" />

				<button class="action-btn action-btn-primary" (click)="fileInput.click()">
					<span class="material-symbols-outlined">upload_file</span>
					<span class="action-btn-text">Upload Files</span>
				</button>

				<button class="action-btn action-btn-secondary" (click)="folderInput.click()">
					<span class="material-symbols-outlined">drive_folder_upload</span>
					<span class="action-btn-text">Upload Folder</span>
				</button>

				<button class="action-btn action-btn-secondary" (click)="createFolder.emit()">
					<span class="material-symbols-outlined">create_new_folder</span>
					<span class="action-btn-text">New Folder</span>
				</button>
			</div>

			<!-- Navigation -->
			<nav class="sidebar-nav">
				<div class="nav-section">
					<button
						class="nav-item"
						[class.nav-item-active]="!currentFolderId"
						(click)="folderSelect.emit(null)">
						<span class="material-symbols-outlined">home</span>
						<span class="nav-item-text">My Files</span>
					</button>
				</div>

				<div class="nav-section" *ngIf="folders.length > 0">
					<div class="nav-section-header">
						<span class="nav-section-title">Folders</span>
					</div>
					<div class="nav-section-content">
						<button
							*ngFor="let folder of folders"
							class="nav-item nav-item-nested"
							[class.nav-item-active]="folder.id === currentFolderId"
							(click)="folderSelect.emit(folder.id)">
							<span class="material-symbols-outlined">folder</span>
							<span class="nav-item-text">{{ folder.name }}</span>
						</button>
					</div>
				</div>
			</nav>
		</aside>
	`,
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	@Input() currentFolderId: string | null = null;
	@Input() folders: FileItem[] = [];
	@Output() createFolder = new EventEmitter<void>();
	@Output() uploadFiles = new EventEmitter<Event>();
	@Output() uploadFolder = new EventEmitter<Event>();
	@Output() folderSelect = new EventEmitter<string | null>();

	onFilesSelected(event: Event): void {
		this.uploadFiles.emit(event);
	}
	onFolderSelected(event: Event): void {
		this.uploadFolder.emit(event);
	}
}
