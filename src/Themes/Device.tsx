const deviceSize = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '414px',
  tablet: '600px',
  tabletL: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const DEVICE = {
  mobileS: `(min-width: ${deviceSize.mobileS})`,
  mobileM: `(min-width: ${deviceSize.mobileM})`,
  mobileL: `(min-width: ${deviceSize.mobileL})`,
  tablet: `(min-width: ${deviceSize.tablet})`,
  tabletL: `(min-width: ${deviceSize.tabletL})`,
  laptop: `(min-width: ${deviceSize.laptop})`,
  laptopL: `(min-width: ${deviceSize.laptopL})`,
  desktop: `(min-width: ${deviceSize.desktop})`,
  desktopL: `(min-width: ${deviceSize.desktop})`
};
