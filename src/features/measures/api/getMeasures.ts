import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Measure } from '../types';

export const getMeasures = async (): Promise<Measure[]> => {
  const result = await axios.get('/measuring/?page=1&itemPerPage=100');
  return result.data;
};

type QueryFnType = typeof getMeasures;

type UseMeasuresOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMeasures = ({ config }: UseMeasuresOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['measures'],
    queryFn: () => getMeasures(),
  });
};
