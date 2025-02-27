import * as React from "react";
import { css, cx } from "@emotion/css";
import { BasicTextProps } from "../textTypes";
import {
  textWeight,
  textSize,
  tintContent,
  textTruncate
} from "../../../shared/styles/styleUtils";
import { themeTextColorPrimary } from "../../../design-tokens/build/js/designTokens";
import { textBase } from "../style";
import { staticClass_resetTextMargin } from "../../../shared/styles/global";

export interface TextProps extends BasicTextProps {
  /**
   * The color of the text
   */
  color?: React.CSSProperties["color"];
  className?: string;
}

const defaultTag = "p";

const Text = (props: TextProps) => {
  const {
    align = "inherit",
    children,
    tag = defaultTag,
    wrap = "wrap",
    weight = "normal",
    color = themeTextColorPrimary,
    size = "m",
    className,
    "data-cy": dataCy = "text"
  } = props;
  const TextTag = tag || defaultTag;
  let title: string | undefined;

  // if truncated, show title attr with complete text
  if (wrap === "truncate" && typeof children === "string") {
    title = children;
  }

  return (
    <TextTag
      className={cx(
        staticClass_resetTextMargin,
        className,
        textBase,
        textWeight(weight),
        textSize(size),
        tintContent(color),
        css`
          text-align: ${align};
        `,
        {
          [textTruncate]: wrap === "truncate",
          [css`
            white-space: nowrap;
          `]: wrap === "nowrap"
        }
      )}
      data-cy={dataCy}
      title={title}
    >
      {children}
    </TextTag>
  );
};

Text.defaultProps = {
  align: "inherit",
  tag: defaultTag,
  wrap: "wrap",
  weight: "normal",
  color: themeTextColorPrimary,
  size: "m",
  ["data-cy"]: "text"
};

export default Text;
