
type RatingFieldProps = {
  value: string,
  checked: boolean,
}
export function RatingField(props: RatingFieldProps): JSX.Element {
  const {value, checked} = props;
  return (
    <>
      <input
        className="form__rating-input visually-hidden" checked={checked} readOnly name="rating" value={value} id={`${value}-stars`} type="radio"
      />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}
