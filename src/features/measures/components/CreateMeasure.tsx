import { PlusIcon } from '@heroicons/react/outline';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { Button } from '@/components/Elements';
import { FormDrawer } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useCreateMeasure } from '../api/createMeasure';

export const CreateMeasure: React.FC = () => {
  const [form] = useForm();
  const createMeasureMutation = useCreateMeasure();

  const handleSubmit = async () => {
    const values = form.getFieldsValue();

    console.log({ ...values, numericalOrder: parseInt(values.numericalOrder) });
    await createMeasureMutation.mutateAsync({
      data: { ...values, numericalOrder: parseInt(values.numericalOrder) },
    });
  };

  const handleOnFieldChange = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createMeasureMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Measure
          </Button>
        }
        title="Create Measure"
        submitButton={
          <Button onClick={handleSubmit} form="create-measure" type="submit" size="sm">
            Submit
          </Button>
        }
      >
        <Form form={form} onFieldsChange={handleOnFieldChange}>
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
