import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface SalesTableItem {
  id: number;
  category: string;
  a: number;
  b: number;  
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: SalesTableItem[] = [
  { "id": 1, "category": "Eating", "a": 65, "b": 28 },
  { "id": 2, "category": "Drinking", "a": 59, "b": 48 },
  { "id": 3, "category": "Sleeping", "a": 90, "b": 40 },
  { "id": 4, "category": "Designing", "a": 81, "b": 19 },
  { "id": 5, "category": "Coding", "a": 56, "b": 96 },
  { "id": 6, "category": "Cycling", "a": 55, "b": 27 },
  { "id": 7, "category": "Running", "a": 40, "b": 100 }
];

/**
 * Data source for the SalesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SalesTableDataSource extends DataSource<SalesTableItem> {
  data: SalesTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<SalesTableItem[]> {
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
  private getPagedData(data: SalesTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SalesTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'category': return compare(a.category, b.category, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'a': return compare(+a.a, +b.a, isAsc);
        case 'b': return compare(+a.b, +b.b, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Category columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
