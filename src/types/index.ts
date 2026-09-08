export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  files: ProjectFile[];
}

export interface ProjectFile {
  id: string;
  path: string;
  tested: boolean;
  cleaned: boolean;
  reviewed: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface ProjectStats {
  total: number;
  tested: number;
  cleaned: number;
  reviewed: number;
}
