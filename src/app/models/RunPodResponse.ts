export type RunPodStatus = 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED' ;

interface BaseRunPodResponse {
  id: string;
  status: RunPodStatus;
  delayTime?: number;
  workerId?: string;
}

export interface RunPodInQueueResponse extends BaseRunPodResponse {
  status: 'IN_QUEUE';
}

export interface RunPodInProgressResponse extends BaseRunPodResponse {
  status: 'IN_PROGRESS';
}

export interface RunPodFailedResponse extends BaseRunPodResponse {
  status: 'FAILED';
}

export interface RunPodCancelledResponse extends BaseRunPodResponse {
  status: 'CANCELLED';
}

export interface RunPodCompletedResponse extends BaseRunPodResponse {
  status: 'COMPLETED';
  executionTime: number;
  output: RunPodOutput[];
}

export type RunPodResponse =
  | RunPodInQueueResponse
  | RunPodInProgressResponse
  | RunPodCompletedResponse
  | RunPodFailedResponse
  | RunPodCancelledResponse;

export interface RunPodOutput {
  choices: {
    finish_reason: string;
    index: number;
    text: string;
  }[];
  created: number;
  id: string;
  model: string;
  object: string;
  system_fingerprint: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
}
