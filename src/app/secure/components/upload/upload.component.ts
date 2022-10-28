import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();
  @Input() url:string;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  upload(files: FileList): void {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);

    this.http.post(this.url, data)
      .subscribe((res: any) => {
          this.uploaded.emit(res.url);
        }
        ,(err:any)=>console.log(err)
        
      );
  }
}
