import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

export type ControlledCheckboxProps = Omit<
  ControllerProps<any, any>,
  'render'
> &
  PropsWithChildren & {
    checkboxProps?: CheckboxProps;
  };

const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
  children,
  checkboxProps,
  ...controllerProps
}) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, ref, value } }) => {
        return (
          <Checkbox
            {...checkboxProps}
            onChange={onChange}
            ref={ref}
            isChecked={value === true}
          >
            {children}
          </Checkbox>
        );
      }}
    />
  );
};

export default ControlledCheckbox;
