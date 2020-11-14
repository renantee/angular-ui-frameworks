import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface CustomersTableItem {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CustomersTableItem[] = [{
    "id": 1,
    "firstname": "Birgit",
    "lastname": "Mallen",
    "city": "Fuxi",
    "country": "China"
  }, {
    "id": 2,
    "firstname": "Ellery",
    "lastname": "Lakenden",
    "city": "Köpingsvik",
    "country": "Sweden"
  }, {
    "id": 3,
    "firstname": "Hardy",
    "lastname": "Polon",
    "city": "Palaiseau",
    "country": "France"
  }, {
    "id": 4,
    "firstname": "Rea",
    "lastname": "Cammiemile",
    "city": "Xia Dawo",
    "country": "China"
  }, {
    "id": 5,
    "firstname": "Spence",
    "lastname": "Quogan",
    "city": "Trakai",
    "country": "Lithuania"
  }, {
    "id": 6,
    "firstname": "Wendell",
    "lastname": "Baumaier",
    "city": "Chekmagush",
    "country": "Russia"
  }, {
    "id": 7,
    "firstname": "Pembroke",
    "lastname": "Applin",
    "city": "Binafun",
    "country": "Indonesia"
  }, {
    "id": 8,
    "firstname": "Jo-anne",
    "lastname": "Mc Gee",
    "city": "Noisy-le-Grand",
    "country": "France"
  }, {
    "id": 9,
    "firstname": "Marje",
    "lastname": "Cicculini",
    "city": "Geneina",
    "country": "Sudan"
  }, {
    "id": 10,
    "firstname": "Kleon",
    "lastname": "Fairchild",
    "city": "Balkh",
    "country": "Afghanistan"
  }, {
    "id": 11,
    "firstname": "Alana",
    "lastname": "Menelaws",
    "city": "Amiens",
    "country": "France"
  }, {
    "id": 12,
    "firstname": "Siegfried",
    "lastname": "Spelwood",
    "city": "Itapuí",
    "country": "Brazil"
  }, {
    "id": 13,
    "firstname": "Peria",
    "lastname": "Brotherhood",
    "city": "Valle de Guanape",
    "country": "Venezuela"
  }, {
    "id": 14,
    "firstname": "Redford",
    "lastname": "Giacubo",
    "city": "Wenceslao Escalante",
    "country": "Argentina"
  }, {
    "id": 15,
    "firstname": "Zebedee",
    "lastname": "Hinemoor",
    "city": "Washington",
    "country": "United States"
  }];

/**
 * Data source for the CustomersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CustomersTableDataSource extends DataSource<CustomersTableItem> {
  data: CustomersTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<CustomersTableItem[]> {
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
  private getPagedData(data: CustomersTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CustomersTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstname': return compare(a.firstname, b.firstname, isAsc);
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'country': return compare(a.country, b.country, isAsc);
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
