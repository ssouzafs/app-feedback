export interface IFeedbackCreateDataType {
  type: string;
  comment: string;
  screenshot?: string
}

export interface IFeedbackRepository {
  create: (data: IFeedbackCreateDataType) => Promise<void>
}