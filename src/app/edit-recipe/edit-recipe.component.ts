import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = '';
  dataImage: any;
  imageToggleVal!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  uploadFileEvt(imgFile: any): void {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      // @ts-ignore
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name;
      });

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.dataImage = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    }
    else {
      this.fileAttr = '';
    }
  }

  showPreview(event: any): void {
    this.dataImage = event.target.value;
  }

  onValChange(value: any): void {
    this.imageToggleVal = value;
    this.dataImage = null;
  }

}
