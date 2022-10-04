import { Line } from './line'

export enum Stop {
  TUM = 'TUM', // Tuen Mun
  SIH = 'SIH', // Siu Hong
  TIS = 'TIS', // Tin Shui Wai
  LOP = 'LOP', // Long Ping
  YUL = 'YUL', // Yuen Long
  KSR = 'KSR', // Kam Sheung Road
  TWW = 'TWW', // Tsuen Wan West
  MEF = 'MEF', // Mei Foo
  NAC = 'NAC', // Nam Cheong
  AUS = 'AUS', // Austin
  ETS = 'ETS', // East Tsim Sha Tsui
  HUH = 'HUH', // Hung Hom
  HOM = 'HOM', // Ho Man Tin
  TKW = 'TKW', // To Kwa Wan
  SUW = 'SUW', // Sung Wong Toi
  KAT = 'KAT', // Kai Tak
  DIH = 'DIH', // Diamond Hill
  HIK = 'HIK', // Hin Keng
  TAW = 'TAW', // Tai Wai
  CKT = 'CKT', // Che Kung Temple
  STW = 'STW', // Sha Tin Wai
  CIO = 'CIO', // City One
  SHM = 'SHM', // Shek Mun
  TSH = 'TSH', // Tai Shui Hang
  HEO = 'HEO', // Heng On
  MOS = 'MOS', // Ma On Shan
  WKS = 'WKS', // Wu Kai Sha
}

export const stops = {
  [Stop.TUM]: { nameEn: 'Tuen Mun', nameZh: '屯門' },
  [Stop.SIH]: { nameEn: 'Siu Hong', nameZh: '兆康' },
  [Stop.TIS]: { nameEn: 'Tin Shui Wai', nameZh: '天水圍' },
  [Stop.LOP]: { nameEn: 'Long Ping', nameZh: '朗屏' },
  [Stop.YUL]: { nameEn: 'Yuen Long', nameZh: '元朗' },
  [Stop.KSR]: { nameEn: 'Kam Sheung Road', nameZh: '錦上路' },
  [Stop.TWW]: { nameEn: 'Tsuen Wan West', nameZh: '荃灣西' },
  [Stop.MEF]: { nameEn: 'Mei Foo', nameZh: '美孚' },
  [Stop.NAC]: { nameEn: 'Nam Cheong', nameZh: '南昌' },
  [Stop.AUS]: { nameEn: 'Austin', nameZh: '柯士甸' },
  [Stop.ETS]: { nameEn: 'East Tsim Sha Tsui', nameZh: '尖東' },
  [Stop.HUH]: { nameEn: 'Hung Hom', nameZh: '紅磡' },
  [Stop.HOM]: { nameEn: 'Ho Man Tin', nameZh: '何文田' },
  [Stop.TKW]: { nameEn: 'To Kwa Wan', nameZh: '土瓜灣' },
  [Stop.SUW]: { nameEn: 'Sung Wong Toi', nameZh: '宋皇臺' },
  [Stop.KAT]: { nameEn: 'Kai Tak', nameZh: '啟德' },
  [Stop.DIH]: { nameEn: 'Diamond Hill', nameZh: '鑽石山' },
  [Stop.HIK]: { nameEn: 'Hin Keng', nameZh: '顯徑' },
  [Stop.TAW]: { nameEn: 'Tai Wai', nameZh: '大圍' },
  [Stop.CKT]: { nameEn: 'Che Kung Temple', nameZh: '車公廟' },
  [Stop.STW]: { nameEn: 'Sha Tin Wai', nameZh: '沙田圍' },
  [Stop.CIO]: { nameEn: 'City One', nameZh: '第一城' },
  [Stop.SHM]: { nameEn: 'Shek Mun', nameZh: '石門' },
  [Stop.TSH]: { nameEn: 'Tai Shui Hang', nameZh: '大水坑' },
  [Stop.HEO]: { nameEn: 'Heng On', nameZh: '恆安' },
  [Stop.MOS]: { nameEn: 'Ma On Shan', nameZh: '馬鞍山' },
  [Stop.WKS]: { nameEn: 'Wu Kai Sha', nameZh: '烏溪沙' },
}

export const linesStops = {
  [Line.TML]: {
    [Stop.TUM]: stops[Stop.TUM],
    [Stop.SIH]: stops[Stop.SIH],
    [Stop.TIS]: stops[Stop.TIS],
    [Stop.LOP]: stops[Stop.LOP],
    [Stop.YUL]: stops[Stop.YUL],
    [Stop.KSR]: stops[Stop.KSR],
    [Stop.TWW]: stops[Stop.TWW],
    [Stop.MEF]: stops[Stop.MEF],
    [Stop.NAC]: stops[Stop.NAC],
    [Stop.AUS]: stops[Stop.AUS],
    [Stop.ETS]: stops[Stop.ETS],
    [Stop.HUH]: stops[Stop.HUH],
    [Stop.HOM]: stops[Stop.HOM],
    [Stop.TKW]: stops[Stop.TKW],
    [Stop.SUW]: stops[Stop.SUW],
    [Stop.KAT]: stops[Stop.KAT],
    [Stop.DIH]: stops[Stop.DIH],
    [Stop.HIK]: stops[Stop.HIK],
    [Stop.TAW]: stops[Stop.TAW],
    [Stop.CKT]: stops[Stop.CKT],
    [Stop.STW]: stops[Stop.STW],
    [Stop.CIO]: stops[Stop.CIO],
    [Stop.SHM]: stops[Stop.SHM],
    [Stop.TSH]: stops[Stop.TSH],
    [Stop.HEO]: stops[Stop.HEO],
    [Stop.MOS]: stops[Stop.MOS],
    [Stop.WKS]: stops[Stop.WKS],
  },
}
