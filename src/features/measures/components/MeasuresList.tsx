import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { Data, Measure } from '..';
import { useMeasures } from '../api/getMeasures';

import { DeleteMeasure } from './DeleteMeasure';
import { EditMeasure } from './EditMeasure';

export const MeasuresList = () => {
  const measuresQuery = useMeasures();

  const [data, setData] = useState<Measure[] | undefined>([]);
  useEffect(() => {
    setData(measuresQuery.data);
  }, [measuresQuery]);

  if (data?.length === 0 || !data) return <React.Fragment></React.Fragment>;

  return (
    <div>
      <Table rowKey="_id" pagination={false} dataSource={data}>
        <Table.Column
          title="#"
          dataIndex="name"
          align="center"
          render={(_, __, index) => {
            return <div style={{ width: '100px' }}>{index + 1}</div>;
          }}
        />
        <Table.Column
          title="Mã thông số"
          dataIndex="key"
          align="center"
          render={(value) => {
            return <div style={{ width: '300px' }}>{value}</div>;
          }}
        />
        <Table.Column
          title="Tên thông số"
          dataIndex="name"
          align="center"
          render={(value) => {
            return <div style={{ width: '300px' }}>{value}</div>;
          }}
        />
        <Table.Column
          title="Đơn vị"
          dataIndex="unit"
          align="center"
          render={(value) => {
            return <div style={{ width: '300px' }}>{value}</div>;
          }}
        />
        <Table.Column
          title="Hành động"
          align="center"
          render={(_, record: Data) => {
            return (
              <div
                style={{ width: '300px', display: 'flex', justifyContent: 'center', gap: '20px' }}
              >
                <EditMeasure measureId={record._id} />
                <DeleteMeasure id={record._id} />
              </div>
            );
          }}
        />
      </Table>
    </div>
  );
};
