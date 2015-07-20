
var Tasks = new Mongo.Collection('tasks');

var Todo = React.createClass({
  removeTodo: function() {
    Tasks.remove({
         _id: this.props.data._id
       });
  },
  render: function() {
    return <li><a href="#" onClick={this.removeTodo}>[X]</a> { this.props.data.text }</li> 
  }
});


var TodoList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}})
    }
  },
  render: function() {
    console.log(this.data.tasks)
    return <ul>
            { this.data.tasks.map(function(task) { return <Todo key={task.id} data={task}></Todo> }) }
           </ul>;
  }
});



if (Meteor.isClient) {
  
  // counter starts at 0
  Template.body.helpers({
    
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
  
  Template.todolist.helpers({
    TodoList: function() {
      return TodoList;
    }
  });

  Template.body.events({
    'submit .new-task': function(event) {
      event.preventDefault();
      var text = event.target.text.value;
      
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      
      event.target.text.value = '';
    },
    'click .deleter': function(event) {
      event.preventDefault();
      var _id = event.target.dataset.idtag
       Tasks.remove({
         _id: _id
       });
      
    }
    
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log('grr');
  });
}
