// Імпорти бібліотек
import React from 'react';
import Image from 'next/image';
import BlockMessage from '../../../public/BlockMessage.png';

// Імпорт стилів компонентів
import styles from './BlockUser.module.scss';

// Компонент BlockedUser
const BlockedUser = () => {
  return (
    <section className={styles.blockedUserContainer}>
      <div className={styles.messageWrapper}>
        <Image
          src={BlockMessage}
          alt="BlockMessage"
          className={styles.BlImage}
        />
        <button className={styles.ButtonFeedback}>Оскаржити блокування</button>
      </div>
    </section>
  );
};

export default BlockedUser;
