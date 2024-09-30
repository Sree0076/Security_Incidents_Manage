export interface User {
    id: number;
    name: string;
    createdBy: string;
    permissions: string[];
    status: 'active' | 'inactive';
    isEditing: boolean;
  }
  export interface Admin {
    adminId: number;
    employeeName: string;
    assignedOn: string;
    assignedBy: string;
    isIncidentMangenet: boolean;
    isUserMangenet: boolean;
    status: boolean;
    isEditing?: boolean;
  }
  export interface UpdateAdmin {
    adminId: number;
    isIncidentMangenet: boolean;
    isUserMangenet: boolean;
    status: boolean;
  }
  