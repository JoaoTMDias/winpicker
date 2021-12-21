import { useId } from '@fluentui/react-hooks';
import { Icon } from '@fluentui/react/lib/Icon';
import { ITooltipHostStyles, TooltipHost } from '@fluentui/react/lib/Tooltip';
import styles from './styles.module.scss';

interface Props {
  compliant?: boolean;
  level: 'AA' | 'AA+' | 'AAA' | 'AAA+';
}

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

const Grade: React.FC<Props> = ({ compliant, level = 'AA' }) => {
  const tooltipId = useId('tooltip');
  const iconName = compliant ? 'CompletedSolid' : 'ErrorBadge';
  const accessibleDescription = `${
    compliant ? 'Passes' : 'Does not pass'
  } the ${level} level.`;

  return (
    <TooltipHost
      content={accessibleDescription}
      // This id is used on the tooltip itself, not the host
      // (so an element with this id only exists when the tooltip is shown)
      id={tooltipId}
      calloutProps={calloutProps}
      styles={hostStyles}
    >
      <li className={styles.grade} aria-describedby={tooltipId}>
        {compliant}
        <Icon iconName={iconName} />
        <span>{level}</span>
      </li>
    </TooltipHost>
  );
};

export default Grade;
