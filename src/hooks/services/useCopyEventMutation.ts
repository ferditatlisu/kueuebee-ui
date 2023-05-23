import { useMutation } from 'react-query';

export interface PostCopyEventRequest {
  fromTopic: string;
  toTopic: string;
}

export const useCopyEventMutation = () => {
  const { mutate } = useMutation<unknown, unknown, PostCopyEventRequest>({
    mutationFn: async (request) => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/copy-event`, {
        body: JSON.stringify(request),
        method: 'POST',
      });
      return res.json();
    },
  });

  return { mutate };
};