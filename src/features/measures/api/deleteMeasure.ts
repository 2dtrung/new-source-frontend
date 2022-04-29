import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Measure } from '../types';

export const deleteMeasure = ({ measuringId }: { measuringId: string }) => {
  return axios.delete(`/measuring/${measuringId}`);
};

type UseDeleteMeasureOptions = {
  config?: MutationConfig<typeof deleteMeasure>;
};

export const useDeleteMeasure = ({ config }: UseDeleteMeasureOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedMeasure) => {
      await queryClient.cancelQueries('measures');

      const previousMeasures = queryClient.getQueryData<Measure[]>('measures');

      queryClient.setQueryData(
        'measures',
        previousMeasures?.filter((measure) => measure.id !== deletedMeasure.measuringId)
      );

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
        title: 'Measure Deleted',
      });
    },
    ...config,
    mutationFn: deleteMeasure,
  });
};
