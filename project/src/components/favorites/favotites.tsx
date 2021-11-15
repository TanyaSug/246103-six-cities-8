import {Titles} from '../../const';
import FavoriteCard  from './favorites-card';
import {Offer} from '../../types/types';
import {Header} from '../header/header';
import { A } from '../helper-co/anchor/anchor';


type FavoritesProps = {
  offers: Offer[],
}

const ALT_PLACE_IMAGE = 'Place image';

export function Favorites(props: FavoritesProps): JSX.Element {
  const {offers} = props;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">{Titles.FavoriteTitle}</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <A className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </A>
                  </div>
                </div>
                <div className="favorites__places">
                  {offers.map((offer) => <FavoriteCard  offer={offer} key={offer.id} />)}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <A className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </A>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <A href="#">
                        <img className="place-card__image" src="img/apartment-small-04.jpg" width="150" height="110"
                          alt={ALT_PLACE_IMAGE}
                        />
                      </A>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                        >
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"/>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{width: '100%'}}/>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <A href="#">White castle</A>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
