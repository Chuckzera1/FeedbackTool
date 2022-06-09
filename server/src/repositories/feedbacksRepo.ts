export interface CreateFeedbackParams {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface CreateFeedbackRepository {
  create: (params: CreateFeedbackParams) => Promise<void>;
}
export interface FeedbackRepository extends CreateFeedbackRepository {}
