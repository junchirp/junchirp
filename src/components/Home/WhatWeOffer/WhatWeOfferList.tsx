import { FC } from 'react';

import { Offer } from '@/components/Home/WhatWeOffer/WhatWeOffer.types';

import WhatWeOfferCard from './WhatWeOfferCard';

import s from './whatWeOffer.module.scss';

type Props = {
  offers: Offer[];
};

const WhatWeOfferList: FC<Props> = ({ offers }) => {
  return (
    <div className={s.list}>
      {offers.map((offer) => (
        <WhatWeOfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};
export default WhatWeOfferList;
