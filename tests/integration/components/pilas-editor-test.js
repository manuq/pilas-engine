import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas editor", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    this.set("proyecto", {
      modo_de_video: 'pixelart'
    });
    this.set("ocultarEditor", false);
    this.set("ocultarPropiedades", false);
    this.set("escenaActual", 1);
    this.set("alGuardar", () => {});

    this.set("recursos", {
      data: {
        imagenes: [{
          nombre: "plano",
          ruta: "imagenes/fondos/plano.png"
        }],
        sonidos: [{
          nombre: "laser",
          ruta: "sonidos/laser.mp3"
        }]
      }
    });

    await render(hbs `{{pilas-editor
      recursos=recursos
      proyecto=proyecto
      ocultarEditor=ocultarEditor
      ocultarPropiedades=ocultarPropiedades
      escenaActual=escenaActual
      cuandoIntentaGuardar=alGuardar
    }}`);

    assert.ok(find("*").textContent.trim());
  });
});