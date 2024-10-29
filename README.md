# Chat Narciso

Chat Narciso es una aplicación de chat interactiva que permite a los usuarios comunicarse con un asistente virtual que simula una personalidad narcisista. Utiliza **Next.js** para la construcción de la interfaz y **Tailwind CSS** para el diseño responsivo y estilizado. La aplicación permite a los usuarios mantener múltiples conversaciones, almacenar chats localmente y personalizar la experiencia de chat.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Recursos Adicionales](#recursos-adicionales)

## Introducción

Este proyecto fue creado para probar la API de mi otro proyecto [Jarvies](https://github.com/Marcos-Antoni/Jarvis), ya que ese proyecto se comunica con mi propio LLM almacenado en [AWS](https://aws.amazon.com/). La idea principal de este proyecto es crear un chat narcisista que responda de forma distinta a la formalidad común de chatGPT y otros modelos.

## Características

- Interfaz de usuario responsiva.
- Soporte para un máximo de 5 conversaciones.
- Un límite de preguntas del usuario entre 5 y 10.
- Almacenamiento local de chats.
- Personalización de la personalidad del asistente.

## Instalación y Uso

El proyecto está actualmente disponible en [Vercel](https://vercel.com/) en [este link](https://narsiso.vercel.app/).

Para aquellos que quieran instalar el proyecto, sigan estos pasos:

1. Clonen el repositorio:
   ```bash
   git clone https://github.com/Marcos-Antoni/ChatNarsiso.git
   ```
2. Naveguen al directorio del proyecto:
   ```bash
   cd ChatNarsiso
   ```
3. Instalen las dependencias:
   ```bash
   npm install
   ```
4. Ejecuten el proyecto

   ```bash
       npm run dev
       # ||
       yarn dev
       # ||
       pnpm dev
   ```

5. Abren [http://localhost:3000](http://localhost:3000) en su navegador.

## Estructura del Proyecto

El proyecto maneja esta estructura de carpetas:

```
src/
└── app/
   ├── componentes/
   ├── code/
   ├── hooks/
   ├── serverAction
   ├── layout.tsx
   └── page.tsx/
```

- **componentes/**: Contiene los componentes reutilizables de la interfaz de usuario.
- **code/**: Aquí se encuentra la lógica de los chats y las funciones principales de la aplicación.
- **hooks/**: Hooks personalizados de React que le quitan el trabajo de usar lógica a los componentes.
- **serverAction/**: Funciones que manejan las acciones de comunicarse a la API del LLM.
- **layout.tsx**: Archivo que define la estructura general de la aplicación.
- **page.tsx**: Archivo principal que renderiza la página inicial de la aplicación.

## Contribuciones

Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Envía un pull request.

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial de Tailwind CSS](https://tailwindcss.com/docs)
- [Jarvies](https://github.com/Marcos-Antoni/Jarvis)
