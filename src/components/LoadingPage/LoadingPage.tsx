'use client';
import React from 'react';
import styles from './LoadingPage.module.scss';

const LoadingPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.loadingContainer}>
      <video className={styles.loadingVideo} autoPlay loop muted>
        <source src="/IMG_8462.mp4" type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
      <div className={styles.textContainer}>
        <p className={styles.loadingText}>
          Зачекай, будь ласка, відбувається завантаження даних...
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.buttonBack} onClick={handleGoBack}>
            Повернутись
          </button>
          <button className={styles.buttonReload} onClick={handleReload}>
            Оновити
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
