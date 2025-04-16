export interface Team {
  id: string;
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
  created_at: string;
  abstract: File;
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
