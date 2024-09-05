import { Pipe, PipeTransform } from '@angular/core';
import { userDetails } from 'src/app/models/users_forward_form.interface';
@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    items: userDetails[],
    searchTerm: string,
    selectedUserIds?: number[],
    isForwardform?: boolean
  ): userDetails[] {
    if (!items) {
      return [];
    }

    var nonSelectedUsers: userDetails[] =
      selectedUserIds && selectedUserIds.length > 0
        ? items.filter((user) => !selectedUserIds.includes(user.id))
        : items;
    //var nonSelectedUsers:userDetails[] = items.filter(user => !selectedUserIds.includes(user.id)); // Exclude already selected users

    if (!searchTerm) {
      // return [];
      if (isForwardform) {
        return nonSelectedUsers;
      } else {
        return [];
      }
    }

    searchTerm = searchTerm.toLowerCase();

    return nonSelectedUsers.filter((it) => {
      return (
        it.name.toLowerCase().includes(searchTerm) ||
        it.designation.toLowerCase().includes(searchTerm) ||
        it.email.toLowerCase().includes(searchTerm)
      );
    });
  }
}
