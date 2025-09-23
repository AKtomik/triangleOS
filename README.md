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
─ tos-desk
  ├─ tos-desktop
  │  ├─ tos-desktop-icon
  │  │  ...
  │  ├─ tos-desktop-icon
  │  ├─ tos-window
  │  │  ...
  │  └─ tos-window
  └─ tos-deskbar
     ├─ tos-deskbar-launch
     ├─ tos-deskbar-icon
     │  ...
     └─ tos-deskbar-icon
```

Do not forget that `<tos-desk>` inherit from `<tos-window>` and so need to be propely contained. (see [just after](#window))

### Window

```tree
─ tos-window-container
  └─ tos-window
```

`<tos-window>` need `position: absolute` CSS rule to work. To be clear, use `tos-window-container`.

`tos-window-container` does not exist as a node. Differents ways to have it:

- Use `tos-root` if you are at root.
- Add the class `tos-window-container` to an HTML element.

### Model

```tree
─ parent
  │
  ├─ child
  └─ last
```

## Avoid

- Touching `tos-is-*` classes.
- Touching `tos-<TosNode>` classes.
