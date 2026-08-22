import { isSupabaseConfigured, supabase } from './supabase';

export type PlanDecisionStatus = 'proposed' | 'approved' | 'rejected' | 'applied' | 'superseded';

export interface PlanDecisionRecord {
  id: string;
  user_id: string;
  assessment_id: string | null;
  plan_source: string;
  plan_version_from: string | null;
  plan_version_to: string | null;
  status: PlanDecisionStatus;
  rationale: string;
  proposed_changes: unknown[];
  evidence: unknown[];
  confidence: number | null;
  decided_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function loadLatestPlanDecision(): Promise<PlanDecisionRecord | null> {
  if (!isSupabaseConfigured) return null;
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user?.id) return null;

  const { data, error } = await supabase
    .from('plan_decisions')
    .select('*')
    .eq('user_id', authData.user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as PlanDecisionRecord | null;
}
