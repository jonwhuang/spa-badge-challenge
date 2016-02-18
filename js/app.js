window.onload = function (){

miniQuery.DOM.hide('.badge-page');

miniQuery.AjaxWrapper.request({
  url: 'http://localhost:3000/index',
  type: 'GET'
  // Create student list
}).then(function(response){
  var students = JSON.parse(response);
  var studentList = miniQuery.SweetSelector.select('#student-list');
  for(var i = 0; i < students.length; i++){
    var newNode = document.createElement('li');
    newNode.innerHTML = "<a class='student-name' id=" + students[i].id + " href='#'>" + students[i].name + "</a>";
    studentList.appendChild(newNode);
  };
  // Bind click on student to show badges
  miniQuery.EventDispatcher.on('.student-name', 'click', function(){
    var id = this.getAttribute('id').match(/\d+/)[0];
    miniQuery.AjaxWrapper.request({
      url: 'http://localhost:3000/students/' + id,
      type: 'GET'
    }).then(function(response){
      var student = JSON.parse(response);
      // Switch to student screen
      miniQuery.DOM.show('.badge-page');
      miniQuery.DOM.hide('.main-page');
      // Show student name
      miniQuery.SweetSelector.select('.student-header')[0].innerHTML = student.name + "'s Badges";
      miniQuery.AjaxWrapper.request({
        url: 'http://localhost:3000/students/' + id,
        type: 'GET',
      }).then(function(response){
        // Print out badges
        var badges = JSON.parse(response).badges;
        var badgeList = miniQuery.SweetSelector.select('#badge-list');
        badgeList.innerHTML = "";
        for(var i = 0; i < badges.length; i++){
          var badgeInfo = "<div id='" + badges[i].id + "' class='slogan'><div class='body'>" + (i + 1) + ") " + badges[i].name + "</div><div class='vote-on'><form action='#'><input type='hidden' name='badge_id' value=" + badges[i].id + "><input type='hidden' name='vote_type' value='up'><button class='up' type='submit' name='submit'><img src='img/upvote.gif' alt='upvote_image' /></button></form></div><div class='vote-on'><form action='#'><input type='hidden' name='badge_id' value=" + badges[i].id + "><input type='hidden' name='vote_type' value='down'><button class='down' type='submit' name='submit'><img src='img/downvote.gif' alt='downvote_image' /></button></form></div><div class='points-" + badges[i].id +"'> (" + badges[i].points + " points)</div>";
          badgeList.innerHTML += badgeInfo;

      });
    })
  });
});

}
