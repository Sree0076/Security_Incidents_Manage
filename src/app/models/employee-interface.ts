export interface Role {
    id: number;
    name: string;
    permission: {
      id: number;
      permissionName: string;
      incidentManagement: boolean;
      userManagement: boolean;
      incidentCreateOnly: boolean;
    };
  }
  
  export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    designation: string;
    roleId: number;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }
  