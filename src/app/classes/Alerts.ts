import { Router } from "@angular/router";
import Swal from "sweetalert2";

export class Alerts{
   private static EditAlert(service,route:Router,success_msg:String,success_url:String,
    _error_msg:String='',_error_url:String,key,data){
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          service.update(key,data)
        .subscribe(() => {
          route.navigate(['/'+success_url])});
          Swal.fire('Saved!', '', 'success')
          
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })

    }
}