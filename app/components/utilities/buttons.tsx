interface TButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  classes?: string;
}

const primaryBtnLightClasses =
  "bg-btn-bg_lt disabled:opacity-30 hover:bg-btn-hvr_lt text-white px-2 py-4";

const primaryBtnDarkClasses =
  "dark:bg-btn-bg_dark dark:disabled:bg-btn-disable_dark dark:hover:bg-btn-hvr_dark dark:text-text-sec_dark";

const cancelBtnLightClasses =
  "bg-btn-cancel_lt hover:bg-btn-cancel_hvr_lt text-text-text_lt px-2 py-4";

const cancelBtnDarkClasses =
  "dark:bg-btn-cancel_dark dark:hover:bg-btn-cancel_hvr_dark dark:text-text-text_dark";

const PrimaryButton = (props: TButtonProps) => {
  const { children, classes, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={`${primaryBtnLightClasses} ${primaryBtnDarkClasses} ${
        classes ? classes : ""
      }`}
    >
      {children}
    </button>
  );
};

const CancelButton = (props: TButtonProps) => {
  const { children, classes, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={`${cancelBtnLightClasses} ${cancelBtnDarkClasses} ${
        classes ? classes : ""
      }`}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, CancelButton };
