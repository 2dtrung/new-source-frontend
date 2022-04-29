import { ContentLayout } from '@/components/Layout';

import { CreateMeasure } from '../components/CreateMeasure';
import { MeasuresList } from '../components/MeasuresList';

export const Measures = () => {
  return (
    <ContentLayout title="Measures">
      <div className="flex justify-end">
        <CreateMeasure />
      </div>
      <div className="mt-4">
        <MeasuresList />
      </div>
    </ContentLayout>
  );
};
