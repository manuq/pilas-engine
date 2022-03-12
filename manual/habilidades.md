---
title: Habilidades
---

Cuando realizamos juegos hay ciertos comportamientos que son tan comunes
que ni siquiera necesitamos programarlos escribiendo código.

Un ejemplo de estos comportamientos comunes incluyen "hacer que un actor
se mueva con el teclado", "poder arrastrar y soltar un actor con el mouse" etc...

A todos estos comportamientos los llamamos "habilidades", y lo interesante
es que podemos tomar a cualquier actor y "enseñarle" cualquier de las
habilidades para mejorar nuestro juego.

## Desde el editor

Una opción para incorporarle habilidades a un actor es usar el inspector
del actor. Hay una propiedad llamada "Habilidades" en donde cargar una o
más habilidades que busquemos enseñarle a un actor al momento de iniciar
la escena.

![](imagenes/habilidades/habilidades.png)

## Desde el código

Otra opción, es enseñarle una habilidad al actor desde el código.

Imaginá que buscamos crear un juego de cartas, donde el usuario tiene que
poder mover una carta por la pantalla usando el mouse o gestos del dispositivo
mobile. El primer paso es crear el actor, con la imagen que nos interesa:

```typescript
let mi_actor = pilas.actores.actor();
mi_actor.imagen = "imagenes:cartas/carta";
```

Y aquí lo interesante, para hacer que el usuario pueda mover este actor
por la pantalla simplemente tenemos que "enseñarle" al actor la habilidad
arrastrable así:

```typescript
mi_actor.aprender("arrastrable");
```

La lista de habilidades disponibles dentro de pilas es la siguiente:

- "arrastrable"
- "mover con el teclado"
- "oscilar rotacion"
- "oscilar transparencia"
- "oscilar verticalmente"
- "rotar constantemente"
- "seguir al mouse lentamente"
- "seguir al mouse"

## Olvidar o eliminar habilidades

Si en algún momento quieres eliminar una habilidad de un actor, simplemente
se puede llamar a la función `olvidar` así:

```typescript
mi_actor.olvidar("arrastrable");
```

## Habilidades personalizadas

Pilas también te permite crear tus propias habilidades.

Primero, deberías crear una clase que herede de `Habilidad`
e implementar los métodos `iniciar`, `actualizar` y `terminar`.

Por ejemplo, aquí tenemos el código de una habilidad que
se debería colocar en la parte inferior de cuaquier actor:

```typescript
class GirarMuyRapido extends Habilidad {
  iniciar() {
    // aquí puedes acceder a this.actor
  }
  
  actualizar() {
    this.actor.rotacion += 15;
  }
  
  terminar() {
    // aquí puedes acceder a this.actor
  }
}
```

Luego, puedes tomar algún actor de tu juego y enseñarle esta
habilidad usando dos sentecias como estas:

```
this.pilas.habilidades.vincular("girar muy rapido", GirarMuyRapido);
this.aprender("girar muy rapido");
```

Lo bueno de estas habilidades es que una vez que las declaras
se pueden usar en cualquier otro actor, lo único que
deberías hacer es agregar este código al método `iniciar` del
actor:

```
this.aprender("girar muy rapido");
```
