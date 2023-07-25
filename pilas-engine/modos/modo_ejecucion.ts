/// <reference path="modo.ts"/>

class ModoEjecucion extends Modo {
  pilas: Pilas;
  fondo: Phaser.GameObjects.TileSprite;

  ancho: number;
  alto: number;

  graphics: any;
  fps: any;

  clases: {};
  proyecto: any = {};
  codigo: any;
  nombre_de_la_escena_inicial: string = null;
  permitir_modo_pausa: boolean;
  modo_fisica_activado: boolean;
  _escena_en_ejecucion: any = null;
  teclas: Set<string> = null;

  instancia_de_proyecto: any = null;
  con_error: boolean;
  bloques: any;

  constructor() {
    super({ key: "ModoEjecucion" });
    this.es_modo_ejecucion = true;
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];
    this.teclas = new Set();
    this.con_error = false;

    try {
      this.guardar_parametros_en_atributos(datos);

      this.clases = this.obtener_referencias_a_clases();

      this.cargar_animaciones(datos);

      if (!datos.es_cambio_de_escena) {
        this.instanciar_proyecto();
      }

      this.pilas.instrumentacion = {};
      this.pilas.instrumentacion_de_bloques = {};
      this.instanciar_escena(this.nombre_de_la_escena_inicial);

      if (this.pilas.opciones.modo_simple) {
        if (this.pilas["onready"]) {
          this.pilas["onready"](this.pilas);
        } else {
          console.warn("Estas usando pilas en modo simple, pero no has indicado pilas.onready = () => { /* codigo */}");
        }
      } else {
        this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
      }

      this.pilas.historia.limpiar();

      this.conectar_eventos();

      this.vincular_eventos_de_colision();
      this.modificar_modo_de_pantalla();
    } catch (e) {
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
    }
  }

  modificar_modo_de_pantalla() {
    this.pilas.game.scale.scaleMode = Phaser.Scale.FIT; // O bien Phaser.Scale.NONE
    this.pilas.game.scale.resize(this.ancho, this.alto);
  }

  private cargar_animaciones(datos: any) {
    let animaciones = datos.proyecto.animaciones;

    if (animaciones) {
      this.pilas.animaciones.reemplazar_todas_las_animaciones(animaciones);
    }
  }

  private conectar_eventos() {
    this.input.on("pointermove", this.manejar_evento_muevemouse.bind(this));
    this.input.on("pointerdown", this.manejar_evento_click_de_mouse.bind(this));
    this.input.on("pointerup", this.manejar_evento_termina_click.bind(this));
    this.input.keyboard.on("keydown", this.manejar_evento_key_down.bind(this));
    this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
  }

  private manejar_evento_click_de_mouse(evento) {
    let x = evento.worldX;
    let y = evento.worldY;
    let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(x, y);

    this.pilas.eventos.emitir_evento("click_de_mouse", {
      x: posicion.x,
      y: posicion.y,
      evento
    });

    if (this._escena_en_ejecucion) {
      try {

        if (this._escena_en_ejecucion._bloques_cuando_hace_click) {
          this._escena_en_ejecucion._bloques_cuando_hace_click(posicion.x, posicion.y, evento);
        }

        this._escena_en_ejecucion.cuando_hace_click(posicion.x, posicion.y, evento);
        this._escena_en_ejecucion.avisar_click_en_la_pantalla_a_los_actores(posicion.x, posicion.y, evento);
      } catch (e) {
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_hace_click");
      }
    }
  }

  private manejar_evento_termina_click(evento) {
    let x = evento.worldX;
    let y = evento.worldY;
    let p = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(x, y);

    this.pilas.eventos.emitir_evento("termina_click", {
      x: p.x,
      y: p.y,
      evento
    });

    if (this._escena_en_ejecucion) {
      try {
        this._escena_en_ejecucion.cuando_termina_de_hacer_click(p.x, p.y, evento);
        this._escena_en_ejecucion.avisar_cuando_termina_de_hacer_click_en_la_pantalla_a_los_actores(p.x, p.y, evento);
      } catch (e) {
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_hace_click");
      }
    }
  }

  private manejar_evento_muevemouse(evento) {
    let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
    this.pilas.cursor_x = Math.trunc(posicion.x);
    this.pilas.cursor_y = Math.trunc(posicion.y);

    let posicion_absoluta = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
    this.pilas.cursor_x_absoluta = Math.trunc(posicion_absoluta.x);
    this.pilas.cursor_y_absoluta = Math.trunc(posicion_absoluta.y);

    this.pilas.eventos.emitir_evento("mueve_mouse", {
      x: posicion.x,
      y: posicion.y,
      evento
    });

    if (this._escena_en_ejecucion) {
      try {
        this._escena_en_ejecucion.cuando_mueve(posicion.x, posicion.y, evento);
        this._escena_en_ejecucion.avisar_cuando_mueve_a_todos_los_actores(posicion.x, posicion.y, evento);
      } catch (e) {
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_mueve");
      }
    }
  }

  private manejar_evento_key_down(evento) {
    if (!this.teclas.has(evento.code)) {
      this.teclas.add(evento.code);

      let tecla = this.pilas.utilidades.obtener_nombre_de_la_tecla_desde_un_evento(evento);

      this._escena_en_ejecucion.cuando_pulsa_tecla(tecla, evento);
      this._escena_en_ejecucion.avisar_cuando_pulsa_tecla_a_los_actores(tecla, evento);
    }
  }

  private manejar_evento_key_up(evento) {
    this.teclas.delete(evento.code);

    if (evento.key === "Escape") {
      this.pilas.mensajes.emitir_mensaje_al_editor("pulsa_la_tecla_escape", {});
    }

    let tecla = this.pilas.utilidades.obtener_nombre_de_la_tecla_desde_un_evento(evento);

    this._escena_en_ejecucion.cuando_suelta_tecla(tecla, evento);
    this._escena_en_ejecucion.avisar_cuando_suelta_tecla_a_los_actores(tecla, evento);
  }

  cambiar_escena(nombre: string) {
    let parametros = {
      pilas: this.pilas,
      nombre_de_la_escena_inicial: nombre,
      permitir_modo_pausa: this.permitir_modo_pausa,
      codigo: this.codigo,
      proyecto: this.proyecto,
      es_cambio_de_escena: true
    };

    this.pilas.definir_modo("ModoEjecucion", parametros);
  }

  /*
   * Dada una clave, como "12-34", esta función se encarga
   * de recorrer la lista de cuerpos de matterjs y retornar
   * los dos cuerpos que tienen id 12 y 34.
   */
  _obtener_cuerpos_desde_clave(clave, cuerpos_estaticos) {
      let partes = clave.split("-");
      let id_cuerpo_1 = +partes[0];
      let id_cuerpo_2 = +partes[1];

      let figura_1 = cuerpos_estaticos.find(e => e.id === id_cuerpo_1);
      let figura_2 = cuerpos_estaticos.find(e => e.id === id_cuerpo_2);

      return {figura_1, figura_2};
  }

  private _reportar_colision_entre_figuras(figura_1, figura_2, colision=null) {
    try {
      if (figura_1 && figura_2 && figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
        let actor_a = figura_1.gameObject.actor;
        let actor_b = figura_2.gameObject.actor;

        actor_a.colisiones.push(actor_b);
        actor_b.colisiones.push(actor_a);

        let cancelar_1 = actor_a.cuando_comienza_una_colision(actor_b);
        let cancelar_2 = actor_b.cuando_comienza_una_colision(actor_a);

        if (cancelar_1 || cancelar_2) {
          if (colision) {
            colision.isActive = false;
          }
        }
      } else {
        // colisión entre sensor de actor y actor

        if (figura_1 && figura_2 && figura_2.sensor_del_actor && figura_1.gameObject && figura_2.sensor_del_actor !== figura_1.gameObject.actor) {
          figura_2.colisiones.push(figura_1.gameObject.actor);
        }

        if (figura_1 && figura_2 && figura_1.sensor_del_actor && figura_2.gameObject && figura_1.sensor_del_actor !== figura_2.gameObject.actor) {
          figura_1.colisiones.push(figura_2.gameObject.actor);
        }
      }

    } catch (e) {
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "al detectar colisiones");
    }
  }

  private _reportar_colision_activa_entre_figuras(figura_1, figura_2) {
    try {
        if (figura_1 && figura_2 && figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
          let actor_a = figura_1.gameObject.actor;
          let actor_b = figura_2.gameObject.actor;

          if (actor_a.colisiones.indexOf(actor_b) === -1) {
            actor_a.colisiones.push(actor_b);
          }

          if (actor_b.colisiones.indexOf(actor_a) === -1) {
            actor_b.colisiones.push(actor_a);
          }

          actor_a.cuando_se_mantiene_una_colision(actor_b);
          actor_b.cuando_se_mantiene_una_colision(actor_a);
        }
    } catch (e) {
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "al detectar colisiones");
    }
  }

  private _reportar_fin_de_colision_entre_figuras(figura_1, figura_2) {
    try {
      if (figura_1 && figura_2 && figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
        let actor_a = figura_1.gameObject.actor;
        let actor_b = figura_2.gameObject.actor;

        actor_a.colisiones.splice(actor_a.colisiones.indexOf(actor_b), 1);
        actor_b.colisiones.splice(actor_b.colisiones.indexOf(actor_a), 1);

        actor_a.cuando_termina_una_colision(actor_b);
        actor_b.cuando_termina_una_colision(actor_a);
      } else {
        // colisión entre sensor de actor y actor

        if (figura_1 && figura_2 && figura_2.sensor_del_actor && figura_1.gameObject && figura_2.colisiones.indexOf(figura_1.gameObject.actor) > -1) {
          figura_2.colisiones.splice(figura_2.colisiones.indexOf(figura_1.gameObject.actor), 1);
        }

        if (figura_1 && figura_2 && figura_1.sensor_del_actor && figura_2.gameObject && figura_1.colisiones.indexOf(figura_2.gameObject.actor) > -1) {
          figura_1.colisiones.splice(figura_1.colisiones.indexOf(figura_2.gameObject.actor), 1);
        }
      }
    } catch (e) {
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "al detectar colisiones");
    }
  }

  vincular_eventos_de_colision() {
    let pilas = this.pilas;
    let modo = this;

    let mapa_de_colisiones = [];

    this.matter.world.on("beforeupdate", (listener) => {
      // Matter no informa los eventos de colisión en los cuerpos estáticos,
      // así que la siguiente porción de código busca hacer que se generen
      // estos eventos de forma manual.
      //
      // La idea es que los usuarios de pilas siempre puedan escribir código
      // como "cuando_comienza_una_colision" o "cuando_termina_una_colision" sin
      // preocuparse por el tipo de dinámica que tiene un actor.
      //
      let cuerpos_estaticos = this.matter.world.getAllBodies().filter(e => e.isStatic);

      let mapa_de_colisiones_nuevo = [];

      cuerpos_estaticos.map(cuerpo => {
        try {
          let otros_cuerpos = cuerpos_estaticos.filter(c => c.id !== cuerpo.id);
          let colisiones = pilas.Phaser.Physics.Matter.Matter.Query.collides(cuerpo, otros_cuerpos);

          colisiones.map(colision => {
            let figura_1 = colision.bodyA;
            let figura_2 = colision.bodyB;

            if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
              let actor_a = figura_1.gameObject.actor;
              let actor_b = figura_2.gameObject.actor;

              if (actor_a._vivo && actor_b._vivo) {
                let cancelar_1 = actor_a.cuando_colisiona(actor_b);
                let cancelar_2 = actor_b.cuando_colisiona(actor_a);

                mapa_de_colisiones_nuevo.push(`${figura_1.id}-${figura_2.id}`);

                if (cancelar_1 || cancelar_2) {
                  colision.isActive = false;
                }

                if (actor_a._bloques_cuando_colisiona) {
                  cancelar_1 = actor_a._bloques_cuando_colisiona(actor_b);
                }

                if (actor_b._bloques_cuando_colisiona) {
                  cancelar_2 = actor_b._bloques_cuando_colisiona(actor_a);
                }

                if (cancelar_1 || cancelar_2) {
                  colision.isActive = false;
                }

              }
            }
          });

        } catch (e) {
          pilas.mensajes.emitir_excepcion_al_editor(e, "al detectar colisiones");
        }
      });


      let nuevos = mapa_de_colisiones_nuevo.filter(x => !mapa_de_colisiones.includes(x) );
      let siguen_en_contacto = mapa_de_colisiones_nuevo.filter(x => mapa_de_colisiones.includes(x));
      let terminan_de_colisionar = mapa_de_colisiones.filter(x => !mapa_de_colisiones_nuevo.includes(x));

      nuevos.map(key => {
          let { figura_1, figura_2 } = this._obtener_cuerpos_desde_clave(key, cuerpos_estaticos);
          this._reportar_colision_entre_figuras(figura_1, figura_2, null);
      });

      siguen_en_contacto.map(key => {
          let { figura_1, figura_2 } = this._obtener_cuerpos_desde_clave(key, cuerpos_estaticos);
          this._reportar_colision_activa_entre_figuras(figura_1, figura_2);
      });

      terminan_de_colisionar.map(key => {
          let { figura_1, figura_2 } = this._obtener_cuerpos_desde_clave(key, cuerpos_estaticos);
          this._reportar_fin_de_colision_entre_figuras(figura_1, figura_2);
      });

      mapa_de_colisiones = mapa_de_colisiones_nuevo

    });

    this.matter.world.on("collisionstart", (event /*, a, b*/) => {
      for (let i = 0; i < event.pairs.length; i++) {
        let colision = event.pairs[i];
        let figura_1 = colision.bodyA;
        let figura_2 = colision.bodyB;

        this._reportar_colision_entre_figuras(figura_1, figura_2, colision);
      }
    });

    this.matter.world.on("collisionactive", (event, a, b) => {
      for (let i = 0; i < event.pairs.length; i++) {
        let colision = event.pairs[i];
        let figura_1 = colision.bodyA;
        let figura_2 = colision.bodyB;

        this._reportar_colision_activa_entre_figuras(figura_1, figura_2);
      }
    });

    this.matter.world.on("collisionend", (event, a, b) => {
      for (let i = 0; i < event.pairs.length; i++) {
        let colision = event.pairs[i];
        let figura_1 = colision.bodyA;
        let figura_2 = colision.bodyB;

        this._reportar_fin_de_colision_entre_figuras(figura_1, figura_2);
      }
    });
  }

  obtener_escena_inicial() {
    let nombre = this.obtener_nombre_de_la_escena_inicial();
    return this.obtener_escena_por_nombre(nombre);
  }

  obtener_nombre_de_la_escena_inicial() {
    return this.nombre_de_la_escena_inicial;
  }

  obtener_escena_por_nombre(nombre: string) {
    let escenas_encontradas = this.proyecto.escenas.filter((e: any) => e.nombre == nombre);

    let nombres = this.proyecto.escenas.map((e: any) => e.nombre).join(",");

    if (escenas_encontradas.length === 0) {
      throw Error(`No se puede encontrar la escena '${nombre}' en ${nombres}`);
    } else {
      if (escenas_encontradas.length > 1) {
        throw Error(`Hay más de una escena llamada '${nombre}'.`);
      }
    }

    return escenas_encontradas[0];
  }

  instanciar_proyecto() {
    let proyecto = new this.clases["Proyecto"](this.pilas);

    if (proyecto.iniciar) {
      proyecto.iniciar();
    }

    this.instancia_de_proyecto = proyecto;
  }

  instanciar_escena(nombre: string) {
    let escena = this.obtener_escena_por_nombre(nombre);

    if (escena.fondo) {
      this.crear_fondo(escena.fondo, escena.ancho, escena.alto);
    }

    this.crear_escena(escena);
  }

  crear_escena(datos_de_la_escena: any) {
    let nombre = datos_de_la_escena.nombre;

    if (!this.clases[nombre]) {
      throw new Error(`No hay una clase con el nombre ${nombre}`);
    }

    let escena = new this.clases[nombre](this.pilas);
    escena.proyecto = this.instancia_de_proyecto;

    escena.camara.x = datos_de_la_escena.camara_x;
    escena.camara.y = datos_de_la_escena.camara_y;
    escena.fondo = datos_de_la_escena.fondo;
    escena.ancho = datos_de_la_escena.ancho;
    escena.alto = datos_de_la_escena.alto;

    if (datos_de_la_escena.gravedad_x !== undefined) {
      escena.gravedad_x = datos_de_la_escena.gravedad_x;
    }

    if (datos_de_la_escena.gravedad_y !== undefined) {
      escena.gravedad_y = datos_de_la_escena.gravedad_y;
    }

    this.actores = datos_de_la_escena.actores
      .map((e: any) => {
        if (e.activo === false) {
          return false;
        }

        return this.crear_actor(e);
      })
      .map((datos: any) => {
        if (datos) {
          let { actor, entidad } = datos;
          return this.inicializar_actor(actor, entidad);
        } else {
          return false;
        }
      })
      .filter((e: any) => e);

    this._escena_en_ejecucion = escena;

    if (this.bloques && this.bloques.escenas) {
      let items_bloques = this.bloques.escenas.filter(e => e.nombre == nombre);

      // si tiene bloques asociados los evalúa para ejecutarlos.
      if (items_bloques.length > 0) {
        eval(items_bloques[0].bloques.codigo_de_bloques);
      }
    }

    escena.iniciar();

    if (escena._bloques_al_iniciar) {
      escena._bloques_al_iniciar();
    }
  }

  existe_actor_llamado_en_el_proyecto(nombre: string) {
    let nombres_de_todos_los_actores = this.obtener_nombres_de_actores();

    return nombres_de_todos_los_actores.indexOf(nombre) !== -1;
  }

  clonar_actor_por_nombre(nombre: string) {
    let nombres_de_todos_los_actores = this.obtener_nombres_de_actores();

    if (nombres_de_todos_los_actores.indexOf(nombre) === -1) {
      let nombre_mas_similar = this.pilas.utilidades.obtener_mas_similar(nombre, nombres_de_todos_los_actores);
      throw new Error(`No se encuentra el actor "${nombre}", ¿quisiste decir "${nombre_mas_similar}"?`);
    }

    let entidad = this.obtener_definicion_de_actor_por_nombre(nombre);

    // Se elimina el "id" original del actor para que al clonarse, el
    // método "pre_actualizar" del actor le asigne un id autoincremental
    // nuevo.

    entidad.id = undefined;

    let { actor } = this.crear_actor(entidad);
    return this.inicializar_actor(actor, entidad);
  }

  obtener_nombres_de_actores() {
    return this.obtener_entidades_de_actores_de_todas_las_escenas().map((entidad: any) => entidad.nombre);
  }

  obtener_entidades_de_actores_de_todas_las_escenas() {
    return this.proyecto.escenas.map((escena: any) => escena.actores).reduce((a: any, b: any) => a.concat(b));
  }

  obtener_definicion_de_actor_por_nombre(nombre: string) {
    let entidades = this.obtener_entidades_de_actores_de_todas_las_escenas();
    return entidades.filter((entidad: any) => entidad.nombre === nombre)[0];
  }

  crear_actor(entidad: any) {
    let actor = null;

    let clase = this.clases[entidad.nombre];

    if (clase) {
      actor = new this.clases[entidad.nombre](this.pilas);
      actor.proyecto = this.instancia_de_proyecto;

      let items_bloques = this.bloques.actores.filter(e => e.nombre == entidad.nombre);

      // si tiene bloques asociados los evalúa para ejecutarlos.
      if (items_bloques.length > 0) {
        eval(items_bloques[0].codigo_de_bloques);
      }

      let p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);
      p = this.pilas.utilidades.combinar_propiedades(p, entidad);

      actor.pre_iniciar(p);
    } else {
      let nombres_de_clases = Object.getOwnPropertyNames(this.clases);
      throw new Error(`No existe código para crear un actor de la clase ${entidad.nombre}. Las clases disponibles son [${nombres_de_clases.join(", ")}]`);
    }

    return { actor, entidad };
  }

  inicializar_actor(actor: any, entidad: any) {
    actor.agregar_sensores_desde_lista(entidad.sensores);
    actor.iniciar();

    if (actor._bloques_iniciar) {
      actor._bloques_iniciar();
    }

    if (entidad.habilidades) {
      entidad.habilidades.map((habilidad: any) => {
        actor.aprender(habilidad);
      });
    }

    return actor;
  }

  obtener_referencias_a_clases() {
    let codigoDeExportacion = this.obtener_codigo_para_exportar_clases(this.codigo);
    let codigo_completo = this.codigo + codigoDeExportacion;

    return eval(codigo_completo);
  }

  /**
   * Este método se utiliza para extraer todas las referencias a clases y
   * colocarlas en un diccionario que se pueda obtener luego de ejecutar
   * eval.
   *
   * Por ejemplo, si el código es algo como "class Ejemplo {... \n class B ..."
   * esta función va a generar un string de la forma:
   *
   * "__clases = {Ejemplo:Ejemplo,B:B};\n__clases;
   */
  obtener_codigo_para_exportar_clases(codigo) {
    const re_creacion_de_clase = /var (.*) \= \/\*\* @class/g;
    const re_solo_clase = /var\ (\w+)/;
    let lista_de_clases = [];

    if (codigo.match(re_creacion_de_clase)) {
      lista_de_clases = codigo.match(re_creacion_de_clase).map(e => e.match(re_solo_clase)[1]);
    }

    let diccionario = {};

    for (let i = 0; i < lista_de_clases.length; i++) {
      let item = lista_de_clases[i];
      diccionario[item] = item;
    }

    let diccionario_como_cadena = JSON.stringify(diccionario).replace(/"/g, "");
    return `__clases = ${diccionario_como_cadena};\n__clases;`;
  }

  guardar_parametros_en_atributos(datos: any) {
    this.pilas = datos.pilas;
    this.ancho = datos.proyecto.ancho;
    this.alto = datos.proyecto.alto;

    this.nombre_de_la_escena_inicial = datos.nombre_de_la_escena_inicial;
    this.proyecto = datos.proyecto;
    this.codigo = datos.codigo;
    this.permitir_modo_pausa = datos.permitir_modo_pausa;

    this.bloques = datos.proyecto.bloques;
  }

  update() {
    if (this.con_error) {
      return;
    }

    super.update(this.pilas.escena.actores);

    try {
      this.pilas.escena.iniciar_animaciones_pendientes();
      this.pilas.escena.pre_actualizar();
      this.pilas.escena.actualizar();

      if (this.pilas.escena._bloques_al_actualizar) {
        this.pilas.escena._bloques_al_actualizar();
      }

      this.pilas.escena.actualizar_actores();
      this.pilas.escena.reproducir_sonidos_pendientes();

      if (this.pilas.depurador.fisica_en_modo_ejecucion) {
        this.canvas_fisica.setAlpha(1);
        this.actualizar_canvas_fisica();
      } else {
        this.canvas_fisica.setAlpha(0);
      }

      this.posicionar_fondo(this.pilas.escena.desplazamiento_del_fondo_x, this.pilas.escena.desplazamiento_del_fondo_y);
    } catch (e) {
      return this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizando escena");
    }

    if (this.permitir_modo_pausa) {
      this.guardar_foto_de_entidades();
    }

    this.pilas.mensajes.emitir_mensaje_al_editor("codigo_ejecutado", {
      instrumentacion: this.pilas.instrumentacion,
      instrumentacion_de_bloques: this.pilas.instrumentacion_de_bloques
    });

    this.pilas.limpiar_traza_de_ejecucion();
  }

  guardar_foto_de_entidades() {
    if (this.pilas.instrumentacion) {
      let copia_de_instrumentacion = JSON.parse(JSON.stringify(this.pilas.instrumentacion));
      let copia_de_instrumentacion_de_codigo = JSON.parse(JSON.stringify(this.pilas.instrumentacion_de_bloques));
      this.pilas.historia.serializar_escena(this.pilas.escena, copia_de_instrumentacion, copia_de_instrumentacion_de_codigo);
    }
  }

  dibujar_punto_de_control(graphics: Phaser.GameObjects.Graphics, _x: number, _y: number) {
    graphics.fillStyle(0xffffff, 1);
    let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y);
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }
}
