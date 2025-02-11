class Historia {
  pilas: Pilas;
  fotos: any;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.fotos = [];
  }

  limpiar() {
    this.fotos = [];
  }

  serializar_escena(escena_actual: any, instrumentacion: any, instrumentacion_de_bloques: any) {
    this.fotos.push({
      escena: escena_actual.serializar(),
      actores: escena_actual.actores.filter(a => a.esta_vivo()).map(e => e.serializar()),
      instrumentacion,
      instrumentacion_de_bloques
    });
  }

  dibujar_puntos_de_las_posiciones_recorridas(graphics, filtro_actor) {
    let cantidad = 60 * 14;

    let historia_reciente = this.fotos.slice(-cantidad);
    let cantidad_total = historia_reciente.length;

    for (let i = 0; i < cantidad_total; i++) {
      let historia = historia_reciente[i];

      historia.actores.map(entidad => {
        if (filtro_actor) {
          if (filtro_actor.nombre !== entidad.nombre) {
            return;
          }
        }

        let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);

        graphics.fillStyle(entidad.id_color, 1);
        graphics.fillRect(x, y, 2, 2);
      });
    }
  }

  obtener_cantidad_de_posiciones() {
    return this.fotos.length - 1;
  }

  obtener_foto(posicion: number) {
    return this.fotos[posicion];
  }
}
