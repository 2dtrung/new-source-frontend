import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { OneMeasure } from '../types';

export const getMeasure = ({ measureId }: { measureId: string }): Promise<OneMeasure> => {
  return axios.get(`/measuring/${measureId}`);
};

type QueryFnType = typeof getMeasure;

type UseMeasureOptions = {
  measureId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useMeasure = ({ measureId, config }: UseMeasureOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['measure', measureId],
    queryFn: () => getMeasure({ measureId }),
  });
};
