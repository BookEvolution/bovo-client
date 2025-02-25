import { rest } from "msw";
import dummyData from "./dummy.json";

{/*archive의 API요청을 가로채서 응답*/}
export const handlers = [
  rest.get("/archive", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyData));
  }),
];