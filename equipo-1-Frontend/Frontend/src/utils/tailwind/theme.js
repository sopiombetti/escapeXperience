const theme = {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': {
        50: "#F5F4F6",
        100: "#EBE9EC",
        200: "#D1CDD5",
        300: "#B5AEBC",
        400: "#8F8499",
        DEFAULT: "#4B4452",
        600: "#423C48",
        700: "#3B3540",
        800: "#29252D",
        900: "#1C191F",
        950: "#1C191F"
      },
      'secondary': {
        50: "#F2F8F7",
        100: "#E2EEED",
        200: "#C2DCD8",
        300: "#9BC5C0",
        400: "#6AA9A1",
        DEFAULT: "#487D76",
        600: "#41716B",
        700: "#38615C",
        800: "#2F514C",
        900: "#1E3431",
        950: "#182A28"
      },
      'tertiary': {
        50: "#FDFCF2",
        100: "#FBF9E4",
        200: "#F7F2C5",
        300: "#F2EBA6",
        400: "#EDE282",
        DEFAULT: "#E8DA5E",
        600: "#D6C41F",
        700: "#C0AF1B",
        800: "#9C8F16",
        900: "#746A11",
        950: "#554E0C"
      },
      'color-text-dark': '#000000dc',
      'color-text-white': '#ffffffdc',
      
      'color-4': '#15505b',
      'color-5': '#801028',
      'color-6': '#7f5346',
      'color-7': '#f49220',

      'off-white': '#ffffff',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'gray-very-light': '#f1f1f1'
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }

export default theme;