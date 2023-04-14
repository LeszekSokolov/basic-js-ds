const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootT = null;
  }
  root() {
    return this.rootT;
  }

  add(data) {
    let addNode = (rootT) => {
      if (rootT === null) {
        this.rootT = new Node(data);
      } else if (data < rootT.data) {
        if (rootT.left === null) {
          rootT.left = new Node(data);
        } else {
          addNode(rootT.left);
        }
      } else if (data > rootT.data) {
        if (rootT.right === null) {
          rootT.right = new Node(data);
        } else {
          addNode(rootT.right);
        }
      }
    };
    addNode(this.rootT);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    if (!this.rootT) {
      return false;
    }

    let current = this.rootT;

    while (current) {
      if (current.data === data) {
        return current;
      }
      if (current.left && data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  remove(data) {
    this.rootT = remove(this.rootT, data);
    function remove(node, data) {
      if (!node) {
        return null;
      } else if (data > node.data) {
        node.right = remove(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = remove(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }
        let min = node.right;
        while (min.left) {
          min = min.left;
        }
        node.data = min.data;
        node.right = remove(node.right, min.data);
        return node;
      }
    }
  }

  min() {
    let current = this.rootT;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.rootT;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
