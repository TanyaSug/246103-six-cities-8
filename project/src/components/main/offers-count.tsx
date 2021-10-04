type OffersCountProps = {
  offersQuantity: number,
}

export function OffersCount(props: OffersCountProps) {
  return (
    <b className="places__found">{props.offersQuantity} places to stay in Amsterdam</b>
  );
}
