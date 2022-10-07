export enum Line {
  TML = 'TML',
  EAL = 'EAL',
  TWL = 'TWL',
  TCL = 'TCL',
  TKL = 'TKL',
  AEL = 'AEL',
}

export const lineConfig = {
  [Line.TML]: {
    nameEn: 'Tuen Ma Line',
    nameZh: '屯碼綫',
    color: '#5d4037',
  },
  [Line.EAL]: {
    nameEn: 'East Rail Line',
    nameZh: '東鐵線',
    color: '#2C5282',
  },
  [Line.TWL]: {
    nameEn: 'Tsuen Wan Line',
    nameZh: '荃灣綫',
    color: '#9B2C2C',
  },
  [Line.TCL]: {
    nameEn: 'Tung Chung Line',
    nameZh: '東涌綫',
    color: '#DD6B20',
  },
  [Line.TKL]: {
    nameEn: 'Tseung Kwan O Line',
    nameZh: '將軍澳綫',
    color: '#553C9A',
  },
  [Line.AEL]: {
    nameEn: 'Airport Express',
    nameZh: '機場快綫',
    color: '#285E61',
  },
}
