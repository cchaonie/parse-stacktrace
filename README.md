# collaborative-editor

Learn collaborative softwares by creating a collaborative editor

## Introduction

The [slate](https://docs.slatejs.org/) handles the UI part, and the [sharedb](https://share.github.io/sharedb/) handles the collaborative part.

## Operations that json0 support

See [link](https://github.com/ottypes/json0#summary-of-operations)

## Features to be implement

- [x] Handle split_node operation
- [ ] Handle remove_node operation
- [ ] Add `user` management
- [ ] Show the mouse position of the other users
- [ ] Add user interface

### How "insert break" works in slate

The operation object looks like this:

```javascript
{
  path: (2)[(0, 0)],
  position: 2,
  properties: {
  },
  type: 'split_node',
}
```

The `path` points to the node that will be split. The node can be a string, or a paragraph, which contains a list of strings.
The `position` is the index of the node.
The `properties` is the type of hte new node.
The `type` is the field to distinguish the operations.

When the `Enter` is pressed, 2 split_node operations will be dispatched.
The first one is to split the text node into 2 text nodes;
The second one is to move the new text node up, and it will become a paragraph node, at that time, it will be a sibling of the parent of the split text node.

To get the same effect, what needs to happen in sharedb side?
1. get the split text node and the part that belongs to the new text node. This requires *delete string* and *insert object*
2. change the text node to a paragraph. This requires *delete object* and *insert object*