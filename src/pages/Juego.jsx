import React, { useEffect, useState } from "react";
import styles from "../styles/juego.module.css";

export const Juego = () => {
  const [cuadros, setCuadros] = useState([]);

  const llenarDatos = () => {
    const lista = [];

    for (let i = 1; i <= 20; i++) {
      let numImage = i;
      if (numImage > 10) {
        numImage = i - 10;
      }
      lista.push({
        id: i,
        img: `../assets/image_${numImage}.png`,
        abierto: false,
        encontrado: false,
      });
    }
    setCuadros(lista);
    console.log("llenarDatos", lista);
  };

  useEffect(() => {
    llenarDatos();
  }, []);

  return (
    <div className={styles.juego_container}>
      <div className={styles.tablero}>
        {cuadros.map((cuadro) => {
          return <div className={styles.cuadrado} key={cuadro.id}></div>;
        })}
      </div>
    </div>
  );
};
