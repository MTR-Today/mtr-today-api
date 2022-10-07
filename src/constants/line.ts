export enum Line {
  TML = 'TML',
  EAL = 'EAL',
  TWL = 'TWL',
  TCL = 'TCL',
  TKL = 'TKL',
  AEL = 'AEL',
  KTL = 'KTL',
  DRL = 'DRL',
  ISL = 'ISL',
  SIL = 'SIL',
}

export const lineConfig = {
  [Line.TML]: {
    nameEn: 'Tuen Ma Line',
    nameZh: '屯碼綫',
    color: '#9A3820',
  },
  [Line.EAL]: {
    nameEn: 'East Rail Line',
    nameZh: '東鐵線',
    color: '#61B4E4',
  },
  [Line.TWL]: {
    nameEn: 'Tsuen Wan Line',
    nameZh: '荃灣綫',
    color: '#E2231A',
  },
  [Line.TCL]: {
    nameEn: 'Tung Chung Line',
    nameZh: '東涌綫',
    color: '#F38B00',
  },
  [Line.TKL]: {
    nameEn: 'Tseung Kwan O Line',
    nameZh: '將軍澳綫',
    color: '#A35EB5',
  },
  [Line.AEL]: {
    nameEn: 'Airport Express',
    nameZh: '機場快綫',
    color: '#007078',
  },
  [Line.KTL]: {
    nameEn: 'Kwun Tong Line',
    nameZh: '觀塘綫',
    color: '#00AF41',
  },
  [Line.DRL]: {
    nameEn: 'Disneyland Resort Line',
    nameZh: '迪士尼綫',
    color: '#E777CB',
  },
  [Line.ISL]: {
    nameEn: 'Island Line',
    nameZh: '港島綫',
    color: '#0071CE',
  },
  [Line.SIL]: {
    nameEn: 'South Island Line',
    nameZh: '南港島綫',
    color: '#B6BD00',
  },
}
