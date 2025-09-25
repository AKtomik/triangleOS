# TriangleOS

**TriangleOS** is a lightweight pseudo operating system UI for web.
It provides draggable, resizable windows and a desktop-like environment for building games, portfolios, or fun experiments.

Quickstart:

- clone this repository
- custom your windows
- run it in a local server

## Install

You will need to use a [local server](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server) if you want to run the project on your machine.

You can install TriangleOS in **3 different ways**, depending on your project setup:

### Option 1: Clone the example

**This is recommended for getting started!** You will get the HTML example project.
You will also recive last developpements changes.

```sh
git clone https://github.com/AKtomik/triangleOS.git
cd triangleOS
npm install
```

To update you can pull.

Feel free to use this repestory as template!

### Option 2: Use NPM

In any npm project:

```sh
npm install triangleos
```

Then import in your HTML header:

```sh
<script type="module" src="node_modules/triangleos/main.js"></script>
<link rel="stylesheet" href="node_modules/triangleos/main.css">
```

### Option 3: From URL

Dirrectly import in your HTML header:

```sh
<script type="module" src="https://unpkg.com/triangleos/main.js"></script>
<link rel="stylesheet" href="https://unpkg.com/triangleos/main.css">
```

This is the simpler way, but is sligthly slower on loading and require internet connexion.

## Nodes

TriangleOS introduces a set of custom HTML elements, each designed with its own specific purpose and behavior.

Let's break it down!

### `<tos-window>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window`
- Parent: `tos-window-container`

A draggable, customizable, resizable **window** element.
It will insert his content inside a movable window.

### `<tos-window-container>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container`

This elemement is made to contain one or multiples `tos-window`. It can also contain other elements in the same time.

### `<tos-root>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container` > `tos-root`

This is the root window container.
Use only one in DOM.

### `<tos-desk>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window` > `tos-desk`

A desk window able to hold desktop and deskbar.
It inherits from window and so need to be contains as so.

### `<tos-desktop>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container` > `tos-desktop`
- Parent: `tos-desk`

A desktop able to contains windows and desktop icons.

### `<tos-deskbar>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-deskbar`
- Parent: `tos-desk`

A deskbar able to contains deskbar icons.

### `<tos-desktop-icon>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-desktop-icon`
- Parent: `tos-desktop`
- Child: `img` (recommanded)

A desktop icon. Use `ondblclick` event to do something when clicked (open a window, a link, edit something...)

### `<tos-deskbar-icon>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-deskbar-icon`
- Parent: `tos-deskbar`
- Child: `img` (recommanded)

A deskbar icon. Use `onclick` event to do something when clicked (open a window, a link, edit something...)

## Strucutres

Some nodes are made to gather together in particular way.

**Here are some structure rules you should follow:**

### Desk tree

```tree
─ <tos-desk>
  ├─ <tos-desktop>
  │  ├─ <tos-desktop-icon>
  │  │  └─ <img>
  │  │  ...
  │  ├─ <tos-desktop-icon>
  │  ├─ <tos-window>
  │  │  ...
  │  └─ <tos-window>
  └─ <tos-deskbar>
     ├─ <tos-deskbar-launch>
     ├─ <tos-deskbar-icon>
     │  └─ <img>
     │  ...
     └─ <tos-deskbar-icon>
```

Do not forget that `<tos-desk>` inherit from `<tos-window>` and so need to be propely contained. (see [just after](#window-tree))

### Window tree

```tree
─ <tos-window-container>
  └─ <tos-window>
```

`<tos-window>` need to be in a window container.

You have different options:

- Use `<tos-window-container>`.
- `<tos-root>` and `<tos-desktop>` inherit from `<tos-window-container>`. **Use them if you are in the rigth context.**
- You may add the class `tos-window-container` to an HTML element.
  *Note: this will add `position: absolute` to the element.*

### Model

```tree
─ parent
  │
  ├─ child
  └─ last
```

<details>
  <summary><i>There is a box</i></summary>
  <b>There is a cat inside the box.</b>
</details>

## Settings

### Global

### Window

## Avoid

- Touching `tos-is-*` classes.
- Touching `tos-<TosNode>` classes while running.
- Using multiples `<tos-root>` in the sale DOM.
