export type UserRole = 'ciudadano' | 'vendedor' | 'inspector' | 'admin';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  created_at: string;
}
