import WhatWeOfferList from './WhatWeOfferList';
import { offeringsData } from './whatWeOfferData';

import s from './whatWeOffer.module.scss';

const WhatWeOffer = () => {
  return (
    <section className={s.section}>
      <div className={`${s.container}  `}>
        <h2 className={s.title}>Що ми пропонуємо</h2>
        <WhatWeOfferList offers={offeringsData} />
      </div>
    </section>
  );
};
export default WhatWeOffer;
