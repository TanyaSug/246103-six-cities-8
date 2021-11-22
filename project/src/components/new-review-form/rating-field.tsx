import {ChangeEvent} from 'react';

type RatingFieldProps = {
  value: string,
  checked: boolean,
  disabled: boolean,
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
}

export function RatingField(props: RatingFieldProps): JSX.Element {
  const {value, checked, disabled, onChange} = props;
  // eslint-disable-next-line no-console
  console.log(value);
  return (
    <>
      <input
        className="form__rating-input visually-hidden" onChange={onChange} checked={checked} disabled={disabled} name="rating" value={value} id={`${value}-stars`} type="radio"
      />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}
