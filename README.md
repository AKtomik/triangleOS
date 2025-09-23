# TriangleOS

## Custom nodes

### User made nodes

...

### Generated nodes

...

## Strucutres

Some nodes are made to gather together in particular way.

**Here are some structure rules you should follow:**

### Desk

```tree
─ <tos-desk>
  ├─ <tos-desktop>
  │  ├─ <tos-desktop-icon>
  │  │  ...
  │  ├─ <tos-desktop-icon>
  │  ├─ <tos-window>
  │  │  ...
  │  └─ <tos-window>
  └─ <tos-deskbar>
     ├─ <tos-deskbar-launch>
     ├─ <tos-deskbar-icon>
     │  ...
     └─ <tos-deskbar-icon>
```

Do not forget that `<tos-desk>` inherit from `<tos-window>` and so need to be propely contained. (see [just after](#window))

### Window

```tree
─ <tos-window-container>
  └─ <tos-window>
```

`<tos-window>` need to be in a window container.

You have different options:

- Dirrectly use `<tos-window-container>`.
- `<tos-root>` and `<tos-desktop>` inherit from `<tos-window-container>`. **If you are in the rigth context use them.**
- Add the class `tos-window-container` to an HTML element.
  *Note: this will add `position: absolute` to the element.*

### Model

```tree
─ parent
  │
  ├─ child
  └─ last
```

## Avoid

- Touching `tos-is-*` classes.
- Touching `tos-<TosNode>` classes while running.
- Using multiples `<tos-root>` in the sale DOM.
