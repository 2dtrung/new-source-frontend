import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { OneMeasure } from '../types';

export type UpdateMeasureDTO = {
  data: {
    key: string;
    name: string;
    unit: string;
    numericalOrder: number;
  };
  measureId: string;
};

export const updateMeasure = ({ data, measureId }: UpdateMeasureDTO): Promise<OneMeasure> => {
  return axios.put(`/measuring/${measureId}`, data);
};

type UseUpdateMeasureOptions = {
  config?: MutationConfig<typeof updateMeasure>;
};

export const useUpdateMeasure = ({ config }: UseUpdateMeasureOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingMeasure: any) => {
      await queryClient.cancelQueries(['measure', updatingMeasure?.measureId]);

      const previousMeasure = queryClient.getQueryData<OneMeasure>([
        'measure',
        updatingMeasure?.measureId,
      ]);

      queryClient.setQueryData(['measure', updatingMeasure?.measureId], {
        ...previousMeasure,
        ...updatingMeasure.data,
        id: updatingMeasure.measureId,
      });

      return { previousMeasure };
    },
    onError: (_, __, context: any) => {
      if (context?.previousMeasure) {
        queryClient.setQueryData(['measure', context.previousMeasure.id], context.previousMeasure);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['measure', data.id]);
      addNotification({
        type: 'success',
        title: 'Measure Updated',
      });
    },
    ...config,
    mutationFn: updateMeasure,
  });
};
