import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import EmberObject from "@ember/object";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas-inspector/actor", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    this.set(
      "instancia_seleccionada",
      EmberObject.create({
        x: 200,
        y: 300,
        sensores: [] //
      })
    );

    await render(hbs `{{pilas-inspector/actor
      instancia_seleccionada=instancia_seleccionada
    }}`);

    assert.ok(this.element.textContent.includes("¿Es gaseoso?"));
  });
});
