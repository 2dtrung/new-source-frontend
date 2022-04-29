import { Button as ButtonAnt, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { Button } from '@/components/Elements';
import { FormDrawer } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useMeasure } from '../api/getMeasure';
import { useUpdateMeasure } from '../api/updateMeasure';

type UpdateMeasureProps = {
  measureId: string;
};
export const EditMeasure = ({ measureId }: UpdateMeasureProps) => {
  const [form] = useForm();
  const measureQuery = useMeasure({ measureId });
  const updateMeasureMutation = useUpdateMeasure();

  const data = measureQuery.data?.data;

  const initialValue = {
    key: data?.key,
    name: data?.name,
    unit: data?.unit,
    numericalOrder: data?.numericalOrder,
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();

    await updateMeasureMutation.mutateAsync({
      data: { ...values, numericalOrder: parseInt(values.numericalOrder) },
      measureId,
    });
  };

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateMeasureMutation.isSuccess}
        triggerButton={<ButtonAnt type="link">Sửa</ButtonAnt>}
        title="Create Measure"
        submitButton={
          <Button onClick={handleSubmit} form="edit-measure" type="submit" size="sm">
            Submit
          </Button>
        }
      >
        <Form form={form} initialValues={initialValue}>
          <Form.Item name="key" label="Mã thông số">
            <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </Form.Item>
          <Form.Item name="name" label="Tên thông số">
            <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </Form.Item>
          <Form.Item name="unit" label="Đơn vị">
            <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </Form.Item>
          <Form.Item name="numericalOrder" label="Thứ tự">
            <input
              type="number"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </Form.Item>
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
