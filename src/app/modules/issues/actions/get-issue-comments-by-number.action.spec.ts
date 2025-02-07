import { environment } from "src/environments/environment";
import { getIssueCommentsByNumber } from "./get-issue-comments-by-number.action";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
const issueNumber = '123';
const mockComments: any[] = [
  { id: 1, body: 'Comment 1', user: { login: 'user1' } },
  { id: 2, body: 'Comment 2', user: { login: 'user2' } },
];

describe('getIssueComments', () => {
    it('should fetch issue comments sucessfully', async() => {
      const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
      const issueCommentsResponse = new Response(  JSON.stringify(mockComments), {
        status: 200,
        statusText: 'OK',
      } );

      spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);
      const issue = await getIssueCommentsByNumber(issueNumber);

      expect(window.fetch).toHaveBeenCalledWith(requestURL, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      });
    });

    it('should throw an error if the response is not ok', async() => {

      const issueCommentsResponse = new Response(  null, {
        status: 404,
        statusText: 'Not found',
      } );
      spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

      try {
        const issue = await getIssueCommentsByNumber(issueNumber);
        expect(true).toBe(false); // It dont be executed
      } catch (error) {

        expect(error).toBe(`Cant load comment ${issueNumber}`);

      }

    });
});
