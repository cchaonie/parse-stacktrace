# How slate works

In this document, I will try to explain my understanding of the details of slate mechanism.

## How "insert break" works in slate

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

1. get the split text node and the part that belongs to the new text node. This requires _delete string_ and _insert object_
2. change the text node to a paragraph. This requires _delete object_ and _insert object_

## How "merge_node" works in slate

Contrast to the split_node, when delete all text in one line, merge_node will be triggered when the last text is deleted and 2 merge_node operations will be dispatched.

The first merge_node is to merge 2 paragraphs. The result is the text node of the to be deleted paragraph will be appended to the previous sibling paragraph, which means the previous sibling paragraph will have 2 text nodes in its children.

The second merge_node is to merge the 2 text nodes of the previous paragraph because it has a empty text node, which is the text node from the last merge_node operation.


## How to change the style of the text?
Text nodes are the leaves of the whole nodes tree. So by adding extra properties to the text node, we can render different component depending on the custom properties.