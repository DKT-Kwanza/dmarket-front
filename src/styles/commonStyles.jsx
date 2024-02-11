const calcRem = (size) => `${size / 16}rem`;

export const fontSizes = {
    heading1: calcRem(45),
    heading2: calcRem(36),
    heading3: calcRem(26),
    heading4: calcRem(18),
    paragraph: calcRem(14),
    small: calcRem(12),
}

export const buttonSizes = {
    small: calcRem(72),
    base: calcRem(100),
    lg: calcRem(166),
    xl: calcRem(394),
}

export const colors = {
    black: "#000000",
    white: "#FFFFFF",
    // brand
    $mainYellow_l1: "#FFE39A",
    $mainYellow_0: "#ffd465",
    $mainYellow_d1: "#ffb84a",
    // greyscale
    $grey_0: "#f8fafb",
    $grey_1: "#f1f5f5",
    $grey_2: "#eaeeef",
    $grey_3: "#e1e4e6",
    $grey_4: "#ced3d6",
    $grey_5: "#a9afb3",
    $grey_6: "#878d91",
    $grey_7: "#4d5256",
    $grey_8: "#363a3c",
    $grey_9: "#292a2b",
    // success
    $blue_l1: "#87b1f3",
    $blue_0: "#3377FF",
    $blue_d1: "#0055FF",
    // error
    $red_l1: "#ff8e89",
    $red_0: "#ff5d5d",
    $red_d1: "#f24147",
}

export const theme = {
    fontSizes,
    buttonSizes,
    colors,
};

export default theme;