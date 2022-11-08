import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();
  @Input() url:string;
  @Input() image_url:string;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.image_url);
    
  }

  upload(files: FileList): void {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);

    this.http.post(this.url, data)
      .subscribe((res: any) => {

          this.uploaded.emit(res.url);
          this.image_url=res.url;
          console.log(this.image_url);

        }
        ,(err:any)=>console.log(err)

      );
  }
}
