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

Then import in your HTML head:

```sh
<script type="module" src="node_modules/triangleos/main.js"></script>
<link rel="stylesheet" href="node_modules/triangleos/main.css">
```

### Option 3: From URL

Dirrectly import in your HTML head:

```sh
<script type="module" src="https://unpkg.com/triangleos/main.js"></script>
<link rel="stylesheet" href="https://unpkg.com/triangleos/main.css">
```

This is the simpler way, but is sligthly slower on loading and require internet connexion.

## How tos

### How to Install

<details>
<summary><i>More install instructions</i></summary>
There is 3 differents ways of installing TriangleOS. Did not you just read install section above?
<details>
<summary><i>Read anyway</i></summary>
You just skiped all install instructions dont you?
<details>
<summary><i>Yes so let me read <b>how to install</b></i></summary>
Go back read <a href="#install">install</a> little rascal.
</details>
</details>
</details>

### How to Spawn a window

1) **First, you will have to build your window in a template.**

    TriangleOS automaticly import templates from `/tos-templates.html` (customizable),
    So you can insert your template here!

    Your template shoud look something like that:
  
    ```html
    <template id="template-example">
      <tos-window class="size-middle skin-glass" data-title="Example window">
          Your content here!
      </tos-window>
    </template>
    ```

2) **Then, you can spawn it with `TriangleOS.Window.open([template], [parent])`**

    - `[template]` is the template id or Node (if you need to select in other ways).
    - `[parent]` is the parent where the template will be spawned (if you need to select in other ways).

    In our example:

    ```html
    <tos-desktop id="desktop-spawner">
      <tos-desktop-icon ondblclick="TriangleOS.Window.open('template-example', 'desktop-spawner')" data-name="open example!">
          <img src="assets/potato.png">
      </tos-desktop-icon>
    </tos-desktop>
    ```

    Notes: `TriangleOS.Window.open` is a shortcut for `TriangleOS.Template.spawn`. You can use `spawn` for others purposes than spawning a window.

3) **Your window is here!**

### How to Edit a window

You can edit window while running using javascript.
For that, just select the window node and change one of his propety.

For example:

```js
let windowObject = document.getElementById("myWindowId");
windowObject.isFullscreen = false;
windowObject.hideHeader = true;
windowObject.dragContent = true;
```

```js
let windowObject = TriangleOS.Window.parent(aNodeInsideAWindow);
windowObject.hideMiniButton = true;
windowObject.title = "cat supremacy";
```

And so you've edited a window while running!

Note: The settings does not having immediate effects are in `windowObject.options`, they can also be changed.

## Nodes

TriangleOS introduces a set of custom HTML elements, each designed with its own specific purpose and behavior.

Let's break it down!

### `<tos-window-container>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container`

This elemement is made to contain one or multiples `tos-window`. It can also contain other elements in the same time.

### `<tos-window>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container` > `tos-window`
- Parent: `tos-window-container`

A draggable, customizable, resizable **window** element.
It will insert his content inside a movable window.
Because it inherits from `tos-window-container`, you can dirreclty insert windows inside a window.

### `<tos-root>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container` > `tos-root`

This is the root window container.
Use only one in DOM.

### `<tos-desk>`

- Inherit: [`HTMLElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) > `tos-window-container` > `tos-window` > `tos-desk`

A desk window able to hold desktop and deskbar.
It inherits from window and so need to be contains as so.

⚠️ By adding window dirreclty inisde `tos-desk`, thoes will be **above the deskbar**! To avoid that, add windows inside `tos-desktop`.

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

## Global Settings

You can insert custom global settings by using a file OR node.

### Load from file

This is the first way for inserting user settings.

1) Create `tos-settings.js`
2) Inside you set the global value to your settings `window.TOS_SETTINGS = [your custom settings]`
3) Import `tos-settings.js` in your head **BEFORE importing TriangleOS**.

    ```html
    <script type="module" src="/tos-settings.js"></script>
    <script type="module" src="/src/main.js"></script>
    ```

4) Refresh. Your custom settings should be loaded!

### Load from node

This is the second way for inserting user settings.

Insert inside your HTML:

```html
<script id="tos-settings" type="application/json">
  [your custom settings]
</script>
```

### Edit settings

You can edit settings at any time while running using javascript `TriangleOS.Settings.[global setting] = [value];`

⚠️ Some settings support this only partialy.

## Window Settings

You can change window setting by adding `data-[window settings]="[value]"` to the HTML node.

Note: For boolean "true" just do `data-[window settings]`.

To change default value used for windows, change in global settings. Setting: `windows.dataset.default.[window settings]`

A list of all window value and their default value.

```list
- title: "Sans titre"
- isFullscreen: false
- hideHeader: false
- openWay: "random" (see enum WindowOpenWay for possibilities)
- unicOpen: true
- dragHeader: true
- dragContent: false
- hideCloseButton: false
- hideFullButton: false
- hideMiniButton: false
- closeAction: "remove" (see enum WindowCloseAction for possibilities)
- reopenWillRepose: false
- disableCloseButton: false
- cornerResizable: true
```

## Avoid

- Touching `tos-is-*` classes.
- Touching `tos-<TosNode>` classes while running.
- Using multiples `<tos-root>` in the sale DOM.
