function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function parse(node, text) {
  clearNode(node);
  users = JSON.parse(text);
  if (nextId === 0) {
    nextId = users.length;
  }
  var i;
  for(i in users) {
    var user = users[i];
    render(node, user);
  }
}

function render(node, user) {
  var row = document.createElement('tr');
  var html = '';
  html += '<td>' + user.id + '</td>';
  html += '<td>' + user.name + '</td>';
  html += '<td>' + user.username + '</td>';
  html += '<td>' + user.email + '</td>';
  html += '<td><button onclick="handleView(' + user.id + ', true)">View</button></td>';
  row.innerHTML = html;
  node.appendChild(row);
}

function handleView(userId, isEdit) {
  var user = users.find(user => user.id === userId);
  if (!user) {
    alert('User was not found.');
    return;
  }
  if (isEdit) {
    title.innerText = user.name;
    edit_controls.style.display = 'block';
    add_controls.style.display = 'none';
  } else {
    title.innerText = "Adding new user";
    edit_controls.style.display = 'none';
    add_controls.style.display = 'block';
  }
  var userId = user.id;
  delete user.id;
  form.setAttribute('data-uid', userId);
  userForm.innerHTML = buildHTMLForm(userId, user, '');
  modal.style.backgroundColor = '#0005';
  modal.style.zIndex = '999';
  user.id = userId;
}

function buildHTMLForm(userId, user, root) {
  var html = '';
  Object.keys(user).forEach(function (prop) {
    html += '<div>';
    if (typeof user[prop] === 'object') {
      html += buildSection(userId, prop, user[prop]);
    } else {
      html += buildInput(userId, prop, user[prop], root);
    }
    html += '</div>';
  });
  return html;
}

function buildSection(userId, prop, data) {
  var html = '<strong>' + prop.toUpperCase() + '</strong>';
  html += buildHTMLForm(userId, data, prop);
  return '<div class="section">' + html + "</div>";
}

function buildInput(userId, prop, data, root) {
  var path = prop;
  if (root) {
    path = root + '.' + prop; // json path
  }
  var onkeyup = 'handleChange(this, \'' + path + '\', ' + userId + ')';
  var html = '';
  html += '<label>' + prop.toUpperCase() + '</label>';
  html += '<input type="text" onkeyup="' + onkeyup + '" value="' + data + '" />';
  return html;
}

function hideModal() {
  modal.style.backgroundColor = '#0000';
  modal.style.zIndex = '-1';
  setTimeout(function () {
    userForm.innerHTML = '';
    parse(outputNode, JSON.stringify(users));
  });
}
