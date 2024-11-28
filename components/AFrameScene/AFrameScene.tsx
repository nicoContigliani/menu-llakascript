import React, { useEffect, useState } from "react";
import "aframe";

interface AFrameSceneProps {
  items: Array<any>; // Accepting items dynamically
}

const AFrameScene: React.FC<AFrameSceneProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");
    }
  }, []);

  // Filtrar los elementos del menú basado en la búsqueda
  const filteredItems = items.filter((item) =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Prise.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Menu_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Description.toLowerCase().includes(searchQuery.toLowerCase())


  );

  return (
    <div style={{ position: "relative", height: "100vh", background: "#222" }}>
      {/* Barra de búsqueda */}
      <div
        style={{
          position: "absolute",
          top: "0px",  // Subir el buscador
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          padding: "10px",
          background: "#fff",
          borderRadius: "25px",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Buscar en el menú..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "20px",
            fontSize: "16px",
          }}
        />
      </div>

      <a-scene>
        <a-sky src="/images/aconcagua.jpg" radius="60" rotation="0 -100 0"></a-sky>

        {/* Loop over the filtered items to create dynamic menu cards */}
        {filteredItems.map((item, index) => (
          <a-plane
            key={item.Item_id}
            color="#000000" // Cambié el color a uno más moderno
            width="4"
            height="2.5"
            position={`${(index % 3) * 5 - 5
              } ${4 - Math.floor(index / 3) * 3} -10`} // Subir las tarjetas
            // rotation="0 0 0"
            rotation="0 0 0"
            material="opacity: 0.6"
            class="menu-card"
          >
            {/* Imagen del ítem del menú */}
            {item.Item_Image && (
              <a-image
                src={item.Item_Image}
                position="0 0.8 0"
                width="4"
                height="1.5"
                scale="1 1 1"
                material="opacity: 0.7"
              ></a-image>
            )}

            {/* Nombre del ítem */}
            <a-text
              value={item.Name}
              position="0 0.5 0"
              align="center"
              color="#FFFFFF"
              scale="2 2 2"
            ></a-text>

            {/* Descripción del ítem con ajuste responsivo */}
            <a-text
              value={item.Description}
              position="0 -0.2 0"
              align="center"
              color="#FFFFFF"
              scale="1 1.2 1"
              wrap-count="30" // Hace que el texto se ajuste automáticamente
              width="4" // Hace que la descripción ocupe todo el ancho de la tarjeta
            ></a-text>

            {/* Precio */}
            <a-text
              value={`$${item.Price}`}
              position="0 -0.7 0"
              align="center"
              color="#FFD700"
              scale="1.5 1.5 1.5"
            ></a-text>
          </a-plane>
        ))}

        {/* Cámara y cursor para interacción */}
        <a-entity camera look-controls>
          <a-cursor color="yellow"></a-cursor>
        </a-entity>
      </a-scene>

      {/* Botón de "Reproducir Menú" */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "10px",
          borderRadius: "10px",
          zIndex: 10,
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => alert("Funcionalidad adicional de Play/Pause")}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "none",
            backgroundColor: "#444",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Reproducir Menú
        </button>
      </div>
    </div>
  );
};

export default AFrameScene;
