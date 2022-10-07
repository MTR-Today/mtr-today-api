export enum Line {
  TML = 'TML',
  EAL = 'EAL',
  TWL = 'TWL',
  TCL = 'TCL',
}

export const lineConfig = {
  [Line.TML]: {
    nameEn: 'Tuen Ma Line',
    nameZh: '屯碼線',
    color: '#5d4037',
  },
  [Line.EAL]: {
    nameEn: 'East Rail Line',
    nameZh: '東鐵線',
    color: '#2C5282',
  },
  [Line.TWL]: {
    nameEn: 'Tsuen Wan Line',
    nameZh: '荃灣線',
    color: '#9B2C2C',
  },
  [Line.TCL]: {
    nameEn: 'Tung Chung Line',
    nameZh: '東涌線',
    color: '#DD6B20',
  },
}
