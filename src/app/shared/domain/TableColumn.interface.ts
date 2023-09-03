import { ChartData } from '@shared/domain/ChartData.interface';

export interface TableColumn {
	name: string;
	chartData: ChartData[];
}
