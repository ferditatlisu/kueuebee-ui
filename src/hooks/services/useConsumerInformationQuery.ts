import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useConsumerInformationQuery = (group_id: string) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-consumer-info', group_id],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/get-consumer-info?group_id=${group_id}`,
        {
          headers: { 'kafka-id': kafkaCluster.id },
        }
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, refetch, isRefetching };
};
