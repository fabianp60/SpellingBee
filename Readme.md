# Spelling Bee Game

Un juego educativo para practicar ortografía en inglés con audio y retroalimentación visual.

🎮 **Juega ahora**: [https://fabianp60.github.io/SpellingBee/](https://fabianp60.github.io/SpellingBee/)

## Características

- Lista de alfabeto con audio para cada letra
- Lista de palabras con audio
- Juego de deletreo con sistema de puntos
- Efectos de sonido para feedback
- Interfaz responsive usando Bootstrap

## Estructura del Proyecto

```
SpellingBee/
├── index.html                # Menú principal
├── alphabet.html            # Práctica del alfabeto
├── wordslist.html          # Lista de palabras
├── wordsgame.html          # Juego de deletreo
├── site.css                # Estilos CSS
├── wordsbase.js            # Configuración base y funciones comunes
├── alphabet.js             # Lógica del alfabeto
├── wordlist.js             # Lógica de lista de palabras
├── wordsgame.js            # Lógica del juego
└── wwwroot/                # Archivos estáticos
    ├── alphabet/           # Audios del alfabeto (a.mp3 - z.mp3)
    ├── words/             # Audios de palabras
    ├── fxsounds/          # Efectos de sonido
    └── images/            # Imágenes
```

## Cómo Agregar Nueva Lista de Palabras

1. Edita el archivo `wordsbase.js` y modifica el array `wordList`:

````javascript
const wordList = [
    'nueva', 
    'lista',
    'de', 
    'palabras'
];
````