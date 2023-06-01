import * as stops from './stop'

export enum LineCode {
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

export const TML = {
  code: LineCode.TML,
  nameEn: 'Tuen Ma Line',
  nameZh: '屯碼綫',
  color: '#9A3820',
  stops: [
    stops.TUM,
    stops.SIH,
    stops.TIS,
    stops.LOP,
    stops.YUL,
    stops.KSR,
    stops.TWW,
    stops.MEF,
    stops.NAC,
    stops.AUS,
    stops.ETS,
    stops.HUH,
    stops.HOM,
    stops.TKW,
    stops.SUW,
    stops.KAT,
    stops.DIH,
    stops.HIK,
    stops.TAW,
    stops.CKT,
    stops.STW,
    stops.CIO,
    stops.SHM,
    stops.TSH,
    stops.HEO,
    stops.MOS,
    stops.WKS,
  ],
}

export const EAL = {
  code: LineCode.EAL,
  nameEn: 'East Rail Line',
  nameZh: '東鐵線',
  color: '#61B4E4',
  stops: [
    stops.ADM,
    stops.EXC,
    stops.HUH,
    stops.MKK,
    stops.KOT,
    stops.TAW,
    stops.SHT,
    stops.FOT,
    stops.RAC,
    stops.UNI,
    stops.TAP,
    stops.TWO,
    stops.FAN,
    stops.SHS,
    stops.LOW,
    stops.LMC,
  ],
}

export const TWL = {
  code: LineCode.TWL,
  nameEn: 'Tsuen Wan Line',
  nameZh: '荃灣綫',
  color: '#E2231A',
  stops: [
    stops.TSW,
    stops.TWH,
    stops.KWH,
    stops.KWF,
    stops.LAK,
    stops.MEF,
    stops.LCK,
    stops.CSW,
    stops.SSP,
    stops.PRE,
    stops.MOK,
    stops.YMT,
    stops.JOR,
    stops.TST,
    stops.ADM,
    stops.CEN,
  ],
}

export const TCL = {
  code: LineCode.TCL,
  nameEn: 'Tung Chung Line',
  nameZh: '東涌綫',
  color: '#F38B00',
  stops: [
    stops.HOK,
    stops.KOW,
    stops.OLY,
    stops.NAC,
    stops.LAK,
    stops.TSY,
    stops.SUN,
    stops.TUC,
  ],
}

export const TKL = {
  code: LineCode.TKL,
  nameEn: 'Tseung Kwan O Line',
  nameZh: '將軍澳綫',
  color: '#A35EB5',
  stops: [
    stops.NOP,
    stops.QUB,
    stops.YAT,
    stops.TIK,
    stops.TKO,
    stops.LHP,
    stops.HAH,
    stops.POA,
  ],
}

export const AEL = {
  code: LineCode.AEL,
  nameEn: 'Airport Express',
  nameZh: '機場快綫',
  color: '#007078',
  stops: [stops.HOK, stops.KOW, stops.TSY, stops.AIR, stops.AWE],
}

export const KTL = {
  code: LineCode.KTL,
  nameEn: 'Kwun Tong Line',
  nameZh: '觀塘綫',
  color: '#00AF41',
  stops: [
    stops.TIK,
    stops.YAT,
    stops.LAT,
    stops.KWT,
    stops.NTK,
    stops.KOB,
    stops.CHH,
    stops.DIH,
    stops.WTS,
    stops.LOF,
    stops.KOT,
    stops.SKM,
    stops.PRE,
    stops.MOK,
    stops.YMT,
    stops.HOM,
    stops.WHA,
  ],
}

export const DRL = {
  code: LineCode.DRL,
  nameEn: 'Disneyland Resort Line',
  nameZh: '迪士尼綫',
  color: '#E777CB',
  stops: [stops.SUN, stops.DIS],
}

export const ISL = {
  code: LineCode.ISL,
  nameEn: 'Island Line',
  nameZh: '港島綫',
  color: '#0071CE',
  stops: [
    stops.CHW,
    stops.HFC,
    stops.SKW,
    stops.SWH,
    stops.TAK,
    stops.QUB,
    stops.NOP,
    stops.FOH,
    stops.TIH,
    stops.CAB,
    stops.WAC,
    stops.ADM,
    stops.CEN,
    stops.SHW,
    stops.SYP,
    stops.HKU,
    stops.KET,
  ],
}

export const SIL = {
  code: LineCode.SIL,
  nameEn: 'South Island Line',
  nameZh: '南港島綫',
  color: '#B6BD00',
  stops: [stops.ADM, stops.OCP, stops.WCH, stops.LET, stops.SOH],
}

export const lines = [TML, EAL, TWL, TCL, TKL, AEL, KTL, DRL, ISL, SIL]
