function handleChange(node, path, userId) {
  var user = users.find(user => user.id === userId);
  var paths = path.split('.');
  var accessed = user;
  while (true) {
    if (typeof user[paths[0]] !== 'object') {
      break;
    }
    accessed = user[paths.shift()];
  }
  accessed[paths.shift()] = node.value;
}

function addNew() {
  var user = {
    "id": ++nextId,
    "name": "",
    "username": "",
    "email": "",
    "address": {
      "street": "",
      "suite": "",
      "city": "",
      "zipcode": "",
      "geo": {
        "lat": "0",
        "lng": "0"
      }
    },
    "phone": "",
    "website": "",
    "company": {
      "name": "",
      "catchPhrase": "",
      "bs": ""
    }
  };
  users.push(user);
  /**
   * Re-render
   */
  parse(outputNode, JSON.stringify(users));
  handleView(user.id, false);
}

function removeUser() {
  var uid = form.getAttribute('data-uid');
  users = users.filter(user => user.id != uid);
  parse(outputNode, JSON.stringify(users));
  hideModal();
}