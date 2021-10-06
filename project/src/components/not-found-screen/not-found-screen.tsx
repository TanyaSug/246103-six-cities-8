import { Link } from 'react-router-dom';

export function NotFoundScreen(): JSX.Element {
  return (
    <>
      <h1> 404. Not Found </h1>
      <Link to={'/'}>Вернуться на главную</Link>
    </>
  );
}
