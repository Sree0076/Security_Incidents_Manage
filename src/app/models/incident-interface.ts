export interface IncidentData {
  id: number;
  incidentNo: string;
  incidentTitle: string;
  incidentDescription: string;
  reportedBy: string;
  roleOfReporter: string;
  incidentOccuredDate: Date;
  monthYear: string;
  incidentType: string;
  category: string;
  priority: string;
  actionAssignedTo: string;
  deptOfAssignee: string;
  investigationDetails: string;
  associatedImpacts: string;
  collectionOfEvidence: string;
  correction: string;
  correctiveAction: string;
  correctionCompletionTargetDate: string;
  correctionActualCompletionDate: string;
  correctiveActualCompletionDate: string;
  incidentStatus: string;
  correctionDetailsTimeTakenToCloseIncident: number;
  correctiveDetailsTimeTakenToCloseIncident: number;
  isDraft: boolean;
  isCorrectionFilled: boolean;
  accepted: number;
  isSubmittedForReview: boolean;
  employeeId: number;
  documentUrls : string;
  remarks:string;
  preventiveAction: string;
  createdAt: string; 
}

export interface Incidents {
  privacyTotalIncidents: number;
  privacyPendingIncidents: number;
  privacyClosedIncidents: number;
  securityTotalIncidents: number;
  securityPendingIncidents: number;
  securityClosedIncidents: number;
  qualityTotalIncidents: number;
  qualityPendingIncidents: number;
  qualityClosedIncidents: number;
  incidents: IncidentData[];
  assignedIncidents: IncidentData[];
  yearlyIncidentCounts: YearlyIncidentCounts;
}

interface IncidentCounts {
  'Privacy Incidents'?: number;
  'Quality Incidents'?: number;
  'Security Incidents'?: number;
}

interface YearlyIncidentCounts {
  [year: string]: IncidentCounts;
}

export interface CardData {
  title: string;
  total_incidents: number;
  pending_incidents: number;
  closed_incidents: number;
  class: string;
}
