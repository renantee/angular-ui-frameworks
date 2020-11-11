import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface OrdersTableItem {
  model: string;
  brand: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: OrdersTableItem[] = [
  {id: 1, model: 'Galaxy M21s', brand: 'Samsung'},
  {id: 2, model: 'Galaxy Note20 5G', brand: 'Samsung'},
  {id: 3, model: 'Galaxy Tab S7+', brand: 'Samsung'},
  {id: 4, model: 'Galaxy Tab S6 Lite', brand: 'Samsung'},
  {id: 5, model: 'iPhone 12 Pro Max', brand: 'Apple'},
  {id: 6, model: 'iPhone 12 Pro', brand: 'Apple'},
  {id: 7, model: 'iPhone 11 Pro Max', brand: 'Apple'},
  {id: 8, model: 'Watch Series 5', brand: 'Apple'},
  {id: 9, model: 'Mate 40 RS Porsche Design', brand: 'Huawei'},
  {id: 10, model: 'Nova 7 SE 5G Youth', brand: 'Huawei'}
];

/**
 * Data source for the OrdersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrdersTableDataSource extends DataSource<OrdersTableItem> {
  data: OrdersTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrdersTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrdersTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrdersTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'brand': return compare(a.brand, b.brand, isAsc);
        case 'model': return compare(a.model, b.model, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/model columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
