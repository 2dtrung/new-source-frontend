import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Measure } from '../types';

export type CreateMeasureDTO = {
  data: {
    key: string;
    name: string;
    numericalOrder: number;
    unit: string;
  };
};

export const createMeasure = ({ data }: CreateMeasureDTO): Promise<Measure> => {
  return axios.post(`/measuring`, data);
};

type UseCreateMeasureOptions = {
  config?: MutationConfig<typeof createMeasure>;
};

export const useCreateMeasure = ({ config }: UseCreateMeasureOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newMeasure) => {
      await queryClient.cancelQueries('measures');

      const previousMeasures = queryClient.getQueryData<Measure[]>('measures');

      queryClient.setQueryData('measures', [...(previousMeasures || []), newMeasure.data]);

      return { previousMeasures };
    },
    onError: (_, __, context: any) => {
      if (context?.previousMeasures) {
        queryClient.setQueryData('measures', context.previousMeasures);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('measures');
      addNotification({
        type: 'success',
        title: 'Measure Created',
      });
    },
    ...config,
    mutationFn: createMeasure,
  });
};
