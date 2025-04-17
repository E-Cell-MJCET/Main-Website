export interface Team {
  team_name: string;
  no_of_participants: number;
  team_leader_name: string;
  college: string;
  branch: string;
  year: number;
  roll_no: string;
  phone_no: string;
  email: string;
  team_members: TeamMember[];
  abstract: File;
  team_type: string;
  email_verified: boolean;
}

export interface TeamMember {
  name: string;
  roll_no: string;
  phone_no: string;
  email: string;
  college: string;
}

export interface TeamLeaderData {
  name: string;
  roll_no: string;
  phone_no: string;
  email: string;
  college: string;
  branch: string;
  year: number;
  team_name: string;
}
