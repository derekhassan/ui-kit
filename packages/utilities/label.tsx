import * as React from "react";
import nextId from "react-id-generator";
import { cx } from "@emotion/css";
import { InputAppearance } from "../shared/types/inputAppearance";
import {
  tintText,
  visuallyHidden,
  flex,
  margin
} from "../shared/styles/styleUtils";
import { getLabelStyle } from "../shared/styles/formStyles";
import {
  themeError,
  greyLightDarken2
} from "../design-tokens/build/js/designTokens";
import Tooltip from "../tooltip/components/Tooltip";
import { Icon } from "../icon";
import { SystemIcons as SI } from "../icons/dist/system-icons-enum";

const trigger = (
  <Icon color={greyLightDarken2} shape={SI.CircleQuestion} size="xs" />
);
const reqStar = <span className={cx(tintText(themeError))}> *</span>;

export interface RenderLabelProps {
  appearance?: string;
  hidden?: boolean;
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
  tooltipContent?: React.ReactNode;
  className?: string;
  "data-cy"?: string;
}

export const renderLabel = ({
  appearance,
  hidden,
  label,
  id = nextId(),
  required,
  tooltipContent,
  className,
  "data-cy": dataCy = "textInput-label"
}: RenderLabelProps) => {
  const hasError = appearance === InputAppearance.Error;
  const labelClassName = hidden ? cx(visuallyHidden) : getLabelStyle(hasError);
  const labelNode = (
    <label
      className={cx(labelClassName, className)}
      htmlFor={id}
      data-cy={dataCy}
      hidden={hidden}
    >
      {label}
      {required ? reqStar : null}
    </label>
  );
  if (!tooltipContent) {
    return labelNode;
  }
  return (
    <div className={flex()}>
      {labelNode}
      {tooltipContent ? (
        <span className={cx(margin("left", "xs"), margin("bottom", "xxs"))}>
          <Tooltip trigger={trigger} id={`labelTooltip-${id}`} maxWidth={200}>
            {tooltipContent}
          </Tooltip>
        </span>
      ) : null}
    </div>
  );
};
