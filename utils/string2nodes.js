export default function stringToNodes(keyWord, value) {
  const nodes = []
  if (keyWord.toUpperCase().startsWith(value.toUpperCase())) {
    const key1 = keyWord.slice(0, value.length)
    const node1 = {
      name: 'span',
      attrs: { class: 'active-text'},
      children: [{ type: 'text', text: key1}]
    }

    const key2 = keyWord.slice(value.length)
    const node2 = {
      name: 'span',
      attrs: { class: 'text'},
      children: [{ type: 'text', text: key1}]
    }
    nodes.push(node1, node2)
  }else {
    const node = {
      name: 'span',
      attrs: { className: 'text'},
      children: [{ type: 'text', text: keyWord}]
    }
    nodes.push(node)
  }

  return nodes
}