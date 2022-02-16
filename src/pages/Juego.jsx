import React, { useEffect, useState } from "react";
import styles from "../styles/juego.module.css";
import img from "../assets/image_1.png";
export const Juego = () => {
  const [cuadros, setCuadros] = useState([]);

  const [eleccionUno, setEleccionUno] = useState(null);

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
    //console.log("llenarDatos", lista);
  };

  useEffect(() => {
    llenarDatos();
  }, []);

  const handleClickItem = (cuadro) => {
    const newCuadros = cuadros.map((c) => {
      if (cuadro.id === c.id) {
        c.abierto = !c.abierto;
      }
      return c;
    });
    setCuadros(newCuadros);

    //si ya dio click en un cuadro
    if (eleccionUno !== null) {
      setTimeout(() => {
        console.log("x1 ");
        if (cuadro.img === eleccionUno.img) {
          console.log("x2 ");
          const newCuadros = cuadros.map((c) => {
            if (cuadro.img === c.img || eleccionUno.img === c.img) {
              c.encontrado = true;
            }
            return c;
          });
          setCuadros(newCuadros);
          setEleccionUno(null);
        } else {
          console.log("x3 ");
          const newCuadros = cuadros.map((c) => {
            c.abierto = false;
            return c;
          });
          setCuadros(newCuadros);
          setEleccionUno(null);
        }
      }, 300);
    } else {
      console.log("x4 ");
      //si no ha dado un click en el cuadro anterior
      setEleccionUno(cuadro);
    }
  };

  return (
    <div className={styles.juego_container}>
      <div className={styles.tablero}>
        {cuadros.map((cuadro) => {
          return (
            <div
              className={styles.cuadrado}
              key={cuadro.id}
              onClick={() => {
                if (eleccionUno) {
                  if (cuadro.id !== eleccionUno.id) {
                    handleClickItem(cuadro);
                  }
                } else {
                  handleClickItem(cuadro);
                }
              }}
            >
              <img
                className={
                  cuadro.encontrado
                    ? styles.imagen
                    : cuadro.abierto
                    ? styles.imagen
                    : styles.no_image
                }
                src={`${process.env.PUBLIC_URL}/assets/${cuadro.img}`}
                alt={cuadro.img}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
