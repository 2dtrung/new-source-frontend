import { Button } from 'antd';

import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteMeasure } from '../api/deleteMeasure';

type DeleteMeasureProps = {
  id: string;
};

export const DeleteMeasure = ({ id }: DeleteMeasureProps) => {
  const deleteMeasureMutation = useDeleteMeasure();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
        type="link"
        onClick={async () => await deleteMeasureMutation.mutateAsync({ measuringId: id })}
      >
        Xóa
      </Button>
    </Authorization>
  );
};
