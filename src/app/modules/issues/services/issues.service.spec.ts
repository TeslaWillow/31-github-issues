
import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideTanStackQuery, QueryClient } from "@tanstack/angular-query-experimental";

describe('IssuesService', () => {

  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(()=>{
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false,
      },
      providers: [
        provideTanStackQuery(queryClient)
      ]
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', async() => {
    // expect(true).toBeTruthy();
    const { data } = await service.labelsQuery.refetch(); // Refresh last query

    expect(data?.length).toBe(30);

    const [label] = data!;

      expect(typeof label.id).toBe("number");
      expect(typeof label.node_id).toBe("string");
      expect(typeof label.url).toBe("string");
      expect(typeof label.name).toBe("string");
      expect(typeof label.color).toBe("string");
      expect(typeof label.default).toBe("boolean");
      expect(typeof label.description).toBe("string");

  });

});


