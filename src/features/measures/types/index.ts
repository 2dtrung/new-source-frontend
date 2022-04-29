import { BaseEntity } from '@/types';

export type Measure = {
  title: string;
  data: Data[];
  body: string;
  teamId: string;
} & BaseEntity;

export type OneMeasure = {
  title: string;
  data: Data;
  body: string;
  teamId: string;
} & BaseEntity;

export type Data = {
  _id: string;
  key: string;
  name: string;
  unit: string;
  numericalOrder?: number;
};
