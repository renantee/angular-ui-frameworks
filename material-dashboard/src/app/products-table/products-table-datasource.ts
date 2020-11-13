import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ProductsTableItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductsTableItem[] = [{
    "id": 1,
    "name": "Dc Hikiage Hira Huba"
  }, {
    "id": 2,
    "name": "Transfer Sheets"
  }, {
    "id": 3,
    "name": "Gherkin - Sour"
  }, {
    "id": 4,
    "name": "Peach - Fresh"
  }, {
    "id": 5,
    "name": "Sole - Iqf"
  }, {
    "id": 6,
    "name": "Pasta - Lasagna, Dry"
  }, {
    "id": 7,
    "name": "Chicken - Whole Fryers"
  }, {
    "id": 8,
    "name": "Crab - Dungeness, Whole"
  }, {
    "id": 9,
    "name": "Soup - Knorr, Country Bean"
  }, {
    "id": 10,
    "name": "Squash - Sunburst"
  }, {
    "id": 11,
    "name": "Cranberries - Frozen"
  }, {
    "id": 12,
    "name": "Cheese - Feta"
  }, {
    "id": 13,
    "name": "Pork - European Side Bacon"
  }, {
    "id": 14,
    "name": "Rum - Mount Gay Eclipes"
  }, {
    "id": 15,
    "name": "Wine - Sicilia Igt Nero Avola"
  }];

/**
 * Data source for the ProductsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsTableDataSource extends DataSource<ProductsTableItem> {
  data: ProductsTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<ProductsTableItem[]> {
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
  private getPagedData(data: ProductsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
