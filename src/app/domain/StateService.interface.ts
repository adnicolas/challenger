import { Observable } from 'rxjs';

export interface StateService {
	data$: Observable<unknown>;
	setData(data: unknown): void;
}
