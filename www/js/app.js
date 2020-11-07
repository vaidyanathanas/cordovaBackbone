/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require.config({
    baseUrl: 'js',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'jquery.min',
        bootstrap:'bootstrap.min',
        backbone:'backbone-min',
        underscore:'underscore-min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

var main = require(['jquery','underscore','backbone'],function($,_,Backbone){
    var router;
    var HomeView=Backbone.View.extend({
        template:_.template($("#homeTemplate").html()),
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
             var username = loginModel.get('name');
             document.getElementById("usernameHome").innerHTML = username;
            
        }
    });
    var LoginView=Backbone.View.extend({
        template:_.template($("#loginTemplate").html()),
        render:function(){
            this.$el.html(this.template());
        },
        events:{
            "click #registerBtn":'gotoHome'
        },
        gotoHome:function(event){
            console.log(event);
            event.preventDefault();
           
            var username = document.getElementById("name").value;
            var password = document.getElementById("password").value;
            loginModel.set('name', username);
            loginModel.set('password', password);
            console.log(username, password);
            abc =  loginModel.isValid();
            console.log(loginModel.validate)
            if(loginModel.isValid()){
                router.navigate("home", {trigger:true})
            } else {
                alert(loginModel.validationError);
            }
            
        }
    });
    
    var Router=Backbone.Router.extend({
        routes:{
            "":"login",
            "home": "home"
        },
        home:function(){
            var homeView=new HomeView({el:".container",model: loginModel});
            homeView.render();
        },
        login :function(){
            var loginView=new LoginView({el:".container"});
            loginView.render();    
        }
    });
    
    router=new Router();
    Backbone.history.start();


    var LoginMOdel = Backbone.Model.extend({
          validate:function(attr){
              var username = attr.name;
              var password = attr.password;
              var patt = /^(?:(.)(?!\1))*$/;
              var passPatt = /^[a-zA-Z]+$/;
              if(!username){
                  return "Please enter username";
              }
              if (username.length > 10) {
                  return "Username should be less than or equal to 10 charachers";
              }
              if (!patt.test(username)) {
                  return "No character can be repeated in a Username";
              }
              if (username.replace(/[^A-Z]/g, "").length < 1) {
                  return "Username should have atleast one capital letter";
              }
              if (username.replace(/[^0-9]/g, "").length != 1) {
                  return "Username should have one numeric letter";
              }
              
              if(!password){
                  return "Please enter password";
              }
              if (!passPatt.test(password)) {
                  return "Only letters are allowed in password";
              }
              if (password.length < 9) {
                  return "Password should be greater than 8 charachers";
              }
      
              if (password.replace(/[^0-9]/g, "").length > 0) {
                  return "Password should not have numbers";
              }
              if (password === username) {
                  return "Password should not be same has username";
              }
      
          }
      });
      var loginModel = new LoginMOdel();

});

module.exports = main.loginModel;


