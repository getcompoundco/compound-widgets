export function jsx(type, props, ...children) {
  if (typeof type === 'function') {
    return type(props);
  }

  const element = document.createElement(type);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.toLowerCase() === 'classname') {
      element.setAttribute('class', value);
    } else if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      element.setAttribute(name, value.toString());
    }
  });

  children.forEach(child => {
    appendChild(element, child);
  });

  return element;
}

function appendChild(parent, child) {
  if (Array.isArray(child)) {
    child.forEach(nestedChild => appendChild(parent, nestedChild));
  } else if (child !== null && child !== false && child !== undefined) {
    parent.appendChild(
      child.nodeType ? child : document.createTextNode(child.toString())
    );
  }
}

export function Fragment(props) {
  const fragment = document.createDocumentFragment();
  props.children.forEach(child => appendChild(fragment, child));
  return fragment;
}