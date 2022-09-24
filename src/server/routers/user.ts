import { t } from '../context';

export const userRouter = t.router({
  hello: t.procedure.query(({ ctx }) => {
    return {
      message: 'Hello World',
    };
  }),
});
