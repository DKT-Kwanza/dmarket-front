import styled from "styled-components";
import theme from "../../../../../src/styles/commonStyles";

function Button({variant, width, disabled, onClick, label}) {
    return <StyledButton variant={variant} width={width} disabled={disabled} onClick={onClick}>{label}</StyledButton>;
}

const BUTTON_WIDTH = {
    small: `${theme.buttonSizes.small}`,
    base: `${theme.buttonSizes.base}`,
    lg: `${theme.buttonSizes.lg}`,
    xl: `${theme.buttonSizes.xl}`,
}

const TEXT_COLOR = {
    normal: {
        primary: `${theme.colors.white}`,
        secondary: `${theme.colors.black}`,
        tertiary: `${theme.colors.black}`,
        warn: `${theme.colors.white}`,
    },
};

const BUTTON_COLOR = {
    normal: {
        primary: `${theme.colors.$mainYellow_0}`,
        secondary: `${theme.colors.white}`,
        tertiary: `${theme.colors.$grey_1}`,
        warn: `${theme.colors.$red_0}`,
    },
    hover: {
        primary: `${theme.colors.$mainYellow_d1}`,
        secondary: `${theme.colors.$grey_2}`,
        tertiary: `${theme.colors.$grey_3}`,
        warn: `${theme.colors.$red_d1}`,
    },
    active: {
        primary: `${theme.colors.$mainYellow_d1}`,
        secondary: `${theme.colors.$grey_2}`,
        tertiary: `${theme.colors.$grey_3}`,
        warn: `${theme.colors.$red_d1}`,
    },
    disabled: {
        primary: `${theme.colors.$mainYellow_l1}`,
        secondary: `${theme.colors.$grey_3}`,
        tertiary: `${theme.colors.$grey_3}`,
        warn: `${theme.colors.$grey_3}`,
    },
};

const StyledButton = styled.button`
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
  padding: 8px 0;
  font-weight: 400;
  text-align: center;
  width: ${({width}) => BUTTON_WIDTH[width]};
  border: 1px solid ${({variant}) => BUTTON_COLOR.disabled[variant]};
  background-color: ${({variant}) => BUTTON_COLOR.normal[variant]};
  color: ${({variant}) => TEXT_COLOR.normal[variant]};

  &:hover {
    background-color: ${({variant}) => BUTTON_COLOR.hover[variant]};
  }

  &:active {
    background-color: ${({variant}) => BUTTON_COLOR.active[variant]};
  }

  &:disabled {
    background-color: ${({variant}) =>
            BUTTON_COLOR.disabled[variant]} !important;
    border: none;
  }
`;

export default Button;