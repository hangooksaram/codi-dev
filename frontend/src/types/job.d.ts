export interface JobRanks {
  disability: string
  infos: JobRanksInfo[]
}

export interface JobRanksInfo {
  ranking: number
  job: string
  ratio: number
}
