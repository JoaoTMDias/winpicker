/* eslint-disable no-console */
import * as axe from 'axe-core';
import { AxeAuditResult, AxeImpactCount } from './types';
import { expect as baseExpect } from '@playwright/test';

/**
 * Summarizes the type of violations by id.
 */
function summarize(violations: axe.Result[]) {
    return violations.map((violation) => `${violation.id}(${violation.nodes.length})`).join(', ');
}

/**
 * Logs the violations data as a table on the terminal
 */
function logViolationsTable(violations: axe.Result[]) {
    if (violations.length > 0) {
        const TABLE_DATA = {
            count: violations
                .map(({ impact, nodes }) => {
                    return {
                        Impact: impact,
                        Count: nodes.length,
                    };
                })
                .reduce((result: AxeImpactCount[], current) => {
                    const existingItem = result.find((item) => item.Impact === current.Impact);

                    // If an item with the same Impact exists, add the Count to it
                    if (existingItem) {
                        existingItem.Count += current.Count;
                    }

                    // If there's no existing item with the same Impact, add the current item
                    else {
                        result.push(current as AxeImpactCount);
                    }

                    return result;
                }, []),
            violationData: violations.map(({ id, nodes, helpUrl }) => {
                return {
                    Violation: id,
                    Elements: nodes.length,
                    'Help URL': helpUrl,
                };
            }),
        };

        for (const data of Object.keys(TABLE_DATA)) {
            console.table(TABLE_DATA[data as "count" | "violationData"]);
        }
    }
}

export const expect = baseExpect.extend({
    toPassAccessibilityAudit: function (result: AxeAuditResult) {
        try {
            const IS_VIOLATIONS_ARRAY = Array.isArray(result);
            const VIOLATIONS_ARRAY = IS_VIOLATIONS_ARRAY ? result : result.violations;
            const LENGTH = VIOLATIONS_ARRAY.length;
            const PASSES = !LENGTH;
            const SUMMARY = summarize(VIOLATIONS_ARRAY);

            logViolationsTable(VIOLATIONS_ARRAY);

            if (PASSES) {
                return {
                    pass: true,
                    message: () => '✅ There are no accessibility violations.',
                };
            }

            return {
                pass: PASSES,
                message: () => `
          ${this.utils.matcherHint('toPassAccessibilityAudit', undefined, undefined, this)}

          Expected: 0 Violations.
          Received: ${LENGTH} Violations.
          Violations: ${SUMMARY}
          `,
            };
        } catch (err) {
            return {
                pass: false,
                message: () => (err as Error).message,
            };
        }
    },
});
