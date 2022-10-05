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
  ADM = 'ADM', //  Admiralty
  EXC = 'EXC', //  Exhibition Centre
  MKK = 'MKK', //  Mong Kok East
  KOT = 'KOT', //  Kowloon Tong
  SHT = 'SHT', //  Sha Tin
  FOT = 'FOT', //  Fo Tan
  RAC = 'RAC', //  Racecourse
  UNI = 'UNI', //  University
  TAP = 'TAP', //  Tai Po Market
  TWO = 'TWO', //  Tai Wo
  FAN = 'FAN', //  Fanling
  SHS = 'SHS', //  Sheung Shui
  LOW = 'LOW', //  Lo Wu
  LMC = 'LMC', //  Lok Ma Chau
  TSW = 'TSW', // Tsuen Wan
  TWH = 'TWH', // Tai Wo Hau
  KWH = 'KWH', // Kwai Hing
  KWF = 'KWF', // Kwai Fong
  LAK = 'LAK', // Lai King
  LCK = 'LCK', // Lai Chi Kok
  CSW = 'CSW', // Cheung Sha Wan
  SSP = 'SSP', // Sham Shui Po
  PRE = 'PRE', // Prince Edward
  MOK = 'MOK', // Mong Kok
  YMT = 'YMT', // Yau Ma Tei
  JOR = 'JOR', // Jordan
  TST = 'TST', // Tsim Sha Tsui
  CEN = 'CEN', // Central
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
  [Stop.ADM]: { nameEn: 'Admiralty', nameZh: '金鐘' },
  [Stop.EXC]: { nameEn: 'Exhibition Centre', nameZh: '會展' },
  [Stop.MKK]: { nameEn: 'Mong Kok East', nameZh: '旺角東' },
  [Stop.KOT]: { nameEn: 'Kowloon Tong', nameZh: '九龍塘' },
  [Stop.SHT]: { nameEn: 'Sha Tin', nameZh: '沙田' },
  [Stop.FOT]: { nameEn: 'Fo Tan', nameZh: '火炭' },
  [Stop.RAC]: { nameEn: 'Racecourse', nameZh: '馬場' },
  [Stop.UNI]: { nameEn: 'University', nameZh: '大學' },
  [Stop.TAP]: { nameEn: 'Tai Po Market', nameZh: '大埔墟' },
  [Stop.TWO]: { nameEn: 'Tai Wo', nameZh: '太和' },
  [Stop.FAN]: { nameEn: 'Fanling', nameZh: '粉嶺' },
  [Stop.SHS]: { nameEn: 'Sheung Shui', nameZh: '上水' },
  [Stop.LOW]: { nameEn: 'Lo Wu', nameZh: '羅湖' },
  [Stop.LMC]: { nameEn: 'Lok Ma Chau', nameZh: '落馬洲' },
  [Stop.TSW]: { nameZh: '荃灣', nameEn: 'Tsuen Wan' },
  [Stop.TWH]: { nameZh: '大窩口', nameEn: 'Tai Wo Hau' },
  [Stop.KWH]: { nameZh: '葵興', nameEn: 'Kwai Hing' },
  [Stop.KWF]: { nameZh: '葵芳', nameEn: 'Kwai Fong' },
  [Stop.LAK]: { nameZh: '茘景', nameEn: 'Lai King' },
  [Stop.LCK]: { nameZh: '茘枝角', nameEn: 'Lai Chi Kok' },
  [Stop.CSW]: { nameZh: '長沙灣', nameEn: 'Cheung Sha Wan' },
  [Stop.SSP]: { nameZh: '深水埗', nameEn: 'Sham Shui Po' },
  [Stop.PRE]: { nameZh: '太子', nameEn: 'Prince Edward' },
  [Stop.MOK]: { nameZh: '旺角', nameEn: 'Mong Kok' },
  [Stop.YMT]: { nameZh: '油麻地', nameEn: 'Yau Ma Tei' },
  [Stop.JOR]: { nameZh: '佐敦', nameEn: 'Jordan' },
  [Stop.TST]: { nameZh: '尖沙咀', nameEn: 'Tsim Sha Tsui' },
  [Stop.ADM]: { nameZh: '金鐘', nameEn: 'Admiralty' },
  [Stop.CEN]: { nameZh: '中環', nameEn: 'Central' },
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
  [Line.EAL]: {
    [Stop.ADM]: stops[Stop.ADM],
    [Stop.EXC]: stops[Stop.EXC],
    [Stop.HUH]: stops[Stop.HUH],
    [Stop.MKK]: stops[Stop.MKK],
    [Stop.KOT]: stops[Stop.KOT],
    [Stop.TAW]: stops[Stop.TAW],
    [Stop.SHT]: stops[Stop.SHT],
    [Stop.FOT]: stops[Stop.FOT],
    [Stop.RAC]: stops[Stop.RAC],
    [Stop.UNI]: stops[Stop.UNI],
    [Stop.TAP]: stops[Stop.TAP],
    [Stop.TWO]: stops[Stop.TWO],
    [Stop.FAN]: stops[Stop.FAN],
    [Stop.SHS]: stops[Stop.SHS],
    [Stop.LOW]: stops[Stop.LOW],
    [Stop.LMC]: stops[Stop.LMC],
  },
  [Line.TWL]: {
    [Stop.TSW]: stops[Stop.TSW],
    [Stop.TWH]: stops[Stop.TWH],
    [Stop.KWH]: stops[Stop.KWH],
    [Stop.KWF]: stops[Stop.KWF],
    [Stop.LAK]: stops[Stop.LAK],
    [Stop.MEF]: stops[Stop.MEF],
    [Stop.LCK]: stops[Stop.LCK],
    [Stop.CSW]: stops[Stop.CSW],
    [Stop.SSP]: stops[Stop.SSP],
    [Stop.PRE]: stops[Stop.PRE],
    [Stop.MOK]: stops[Stop.MOK],
    [Stop.YMT]: stops[Stop.YMT],
    [Stop.JOR]: stops[Stop.JOR],
    [Stop.TST]: stops[Stop.TST],
    [Stop.ADM]: stops[Stop.ADM],
    [Stop.CEN]: stops[Stop.CEN],
  },
}
