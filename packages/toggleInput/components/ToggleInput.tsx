import * as React from "react";
import { cx } from "@emotion/css";
import nextId from "react-id-generator";

import {
  flex,
  flexItem,
  visuallyHidden,
  display,
  tintContent,
  tintContentSecondary,
  vAlignChildren
} from "../../shared/styles/styleUtils";

import {
  themeError,
  themeSuccess
} from "../../design-tokens/build/js/designTokens";
import {
  bruteForceKillLabelMargin,
  checkboxInput,
  radioInput,
  radioInputChecked,
  toggleInputFeedbackText,
  toggleInputLabel,
  toggleInput,
  toggleInputAppearances
} from "../style";
import { InputAppearance } from "../../shared/types/inputAppearance";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";

export interface ToggleInputProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * Sets the current appearance of the input component. This defaults to InputAppearance.Standard, but supports `InputAppearance.Error` & `InputAppearance.Success` appearances as well.
   */
  appearance?: InputAppearance;
  /**
   * Whether or not the input is checked
   */
  checked?: boolean;
  /**
   * Allows custom styling
   */
  className?: string;
  /**
   * Unique identifier used for the input element
   */
  id?: string;
  /**
   * The text or node content that appears next to the input
   */
  inputLabel: React.ReactNode | string;
  /**
   * Defaults to `true`, but can be set to `false` to visibly hide the content passed to `inputLabel`. The `inputLabel` should still be set even when hidden for accessibility support.
   */
  showInputLabel?: boolean;
  /**
   * The value being toggled
   */
  value?: string;
  /**
   * How the text content vertically aligns with the input
   */
  vertAlign?: "center" | "top";
  /**
   * hintContent is text or a ReactNode that is displayed directly under the input with additional information about the expected input.
   */
  hintContent?: React.ReactNode;
  /**
   * Sets the contents for validation errors. This will be displayed below the input element. Errors are only visible when the `TextInput` appearance is also set to `TextInputAppearance.Error`.
   */
  errors?: React.ReactNode[];
}

interface LocalToggleInputProps extends ToggleInputProps {
  children?: React.ReactNode;
  /**
   * Tells the ToggleInput to render
   */
  inputType?: "checkbox" | "radio";
  /**
   * Only used for the checkbox. Sets whether the checkbox is neither checked or unchecked
   */
  isIndeterminate?: boolean;
}

const ToggleInput = React.forwardRef<HTMLInputElement, LocalToggleInputProps>(
  (props, forwardedRef) => {
    const {
      appearance = InputAppearance.Standard,
      children,
      className,
      disabled,
      hintContent,
      id = nextId("toggleInput-"),
      inputLabel,
      showInputLabel = true,
      vertAlign = "center",
      inputType = "checkbox",
      checked,
      value,
      errors,
      isIndeterminate,
      onBlur,
      onFocus,
      ...other
    } = props;
    const inputDataCy = [
      `${inputType}Input-input`,
      ...(checked ? [`${inputType}Input-input.checked`] : []),
      ...(isIndeterminate ? [`${inputType}Input-input.indeterminate`] : []),
      ...(appearance && appearance !== InputAppearance.Standard
        ? [`${inputType}Input-input.${appearance}`]
        : [])
    ].join(" ");
    const parentDataCy = [
      `${inputType}Input`,
      ...(checked ? [`${inputType}Input.checked`] : []),
      ...(isIndeterminate ? [`${inputType}Input.indeterminate`] : []),
      ...(appearance && appearance !== InputAppearance.Standard
        ? [`${inputType}Input.${appearance}`]
        : [])
    ].join(" ");
    const [hasFocus, setHasFocus] = React.useState<boolean>(false);
    const handleFocus = e => {
      setHasFocus(true);

      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = e => {
      setHasFocus(false);

      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <FormFieldWrapper id={id} errors={errors} hintContent={hintContent}>
        {({ getValidationErrors, isValid, describedByIds, getHintContent }) => (
          <div className={cx(vAlignChildren, className)} data-cy={parentDataCy}>
            <label
              className={cx(
                flex({
                  align: vertAlign === "top" ? "flex-start" : "center"
                }),
                display("inline-flex"),
                bruteForceKillLabelMargin // to override CNVS bottom margin on <label>
              )}
              htmlFor={id}
            >
              <div className={cx(flexItem("shrink"), display("inherit"))}>
                <>
                  <div
                    className={cx(toggleInput, {
                      [toggleInputAppearances[`${appearance}-focus`]]: hasFocus,
                      [toggleInputAppearances[`${appearance}-active`]]:
                        checked || isIndeterminate,
                      [toggleInputAppearances["focus-active"]]:
                        checked && hasFocus,
                      [toggleInputAppearances.disabled]: disabled,
                      [toggleInputAppearances["disabled-active"]]:
                        disabled && checked,
                      [checkboxInput]: inputType === "checkbox",
                      [radioInput]: inputType === "radio",
                      [radioInputChecked]: inputType === "radio" && checked
                    })}
                  >
                    {/* eslint-disable jsx-a11y/role-has-required-aria-props */}
                    <input
                      type={inputType}
                      id={id}
                      className={visuallyHidden}
                      checked={checked}
                      disabled={disabled}
                      value={value}
                      aria-invalid={!isValid}
                      aria-describedby={describedByIds}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      data-cy={inputDataCy}
                      ref={forwardedRef}
                      {...other}
                    />
                    {/* eslint-enable */}
                    {children}
                  </div>
                </>
              </div>
              <div
                className={cx(flexItem("grow"), toggleInputLabel, {
                  [visuallyHidden]: !showInputLabel,
                  [tintContent(themeError)]:
                    appearance === InputAppearance.Error,
                  [tintContent(themeSuccess)]:
                    appearance === InputAppearance.Success,
                  [tintContentSecondary]: disabled
                })}
              >
                {inputLabel}
              </div>
            </label>
            {(getHintContent || getValidationErrors) && (
              <div className={toggleInputFeedbackText}>
                {getHintContent}
                {appearance === InputAppearance.Error && getValidationErrors}
              </div>
            )}
          </div>
        )}
      </FormFieldWrapper>
    );
  }
);

export default ToggleInput;
