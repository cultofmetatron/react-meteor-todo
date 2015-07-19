var Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
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
