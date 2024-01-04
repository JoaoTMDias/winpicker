import * as axe from 'axe-core';

export type AxeAuditResult = axe.AxeResults | axe.Result[];

export interface AxeImpactCount {
  Impact: axe.ImpactValue;
  Count: number;
}
