/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forwardPipe',
  standalone: true,
})
export class ForwardPipePipe implements PipeTransform {
  transform(items: any[], searchTerm: string, selectedUserIds?: number[], isForwardform?:boolean): any[] {
    if (!items) {
      return [];
    }

    const nonSelectedUsers: any[] = selectedUserIds && selectedUserIds.length > 0
    ? items.filter(user => !selectedUserIds.includes(user.id))
    : items;
    //var nonSelectedUsers:userDetails[] = items.filter(user => !selectedUserIds.includes(user.id)); // Exclude already selected users


    if (!searchTerm) {
      // return [];
      if(isForwardform){
        return nonSelectedUsers;
      }
      else{
        return [];
      }
    }

    searchTerm = searchTerm.toLowerCase();

    return nonSelectedUsers.filter(it => {
        return it.name.toLowerCase().includes(searchTerm) ||
               it.designation.toLowerCase().includes(searchTerm) ||
               it.email.toLowerCase().includes(searchTerm);
      });
  }
}
