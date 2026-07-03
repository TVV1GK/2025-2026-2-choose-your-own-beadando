import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrl: './cropper-modal.component.less',
  standalone: false
})
export class CropperModalComponent {

  isVisible = input(false);
  imageBase64 = input<string>();
  confirm = output<string>();
  cancel = output<void>();

  croppedImage: string | null = null;

  onImageCropped(event: any): void {
    this.croppedImage = event.base64;
  }

  confirmImage(): void {
    if (this.croppedImage) {
      this.confirm.emit(this.croppedImage);
      this.resetModal();
    } else {
      if (this.imageBase64()) {
        this.confirm.emit(this.imageBase64()!);
        this.resetModal();
      } else {
        throw new Error("No image to confirm");
      }
    }
  }

  cancelModal(): void {
    this.cancel.emit();
    this.resetModal();
  }

  private resetModal(): void {
    this.croppedImage = null;
  }
}
