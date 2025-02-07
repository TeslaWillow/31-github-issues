
import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideTanStackQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { State } from "../interfaces";

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

  it('should set selected state, OPEN, CLOSED, ALL', async() => {

    // Test from endpoint that all the issues are in the state closed
    service.showIssuesByState( State.Close );
    expect( service.selectedState() ).toBe( State.Close );

    const { data } = await service.issuesQuery.refetch();
    data?.forEach((issue) => {
      expect(issue.state).toBe(State.Close);
    });

    service.showIssuesByState( State.Open );
    expect( service.selectedState() ).toBe( State.Open );

    const { data:dataOpen } = await service.issuesQuery.refetch();
    dataOpen?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });

  });

  it('should set selectedLabels', async() => {

    const label = "Accessibility";

    service.toggleLabel(label);
    expect( service.selectedLabels().has(label) ).toBeTrue();

    service.toggleLabel(label);
    expect( service.selectedLabels().has(label) ).toBeFalse();

  });

  it('should set selectedLabels and get issues by label', async() => {

    const label = "Accessibility";

    service.toggleLabel(label);
    expect( service.selectedLabels().has(label) ).toBeTrue();

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some( l => l.name == label);
      expect(hasLabel).toBeTrue();
    });

  });

});


