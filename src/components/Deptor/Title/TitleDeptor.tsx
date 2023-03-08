import styles from "./TitleDeptor.module.scss";

export const TitleDeptor = () => {
  return (
    <div className={`${styles.allTitle}`}>
      <h2>¿Quien debe?</h2>
      <p>Seleccione el mes y mire quien debe segun la actividad</p>
    </div>
  );
};
