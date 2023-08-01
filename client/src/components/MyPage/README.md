-MyPage represents a director movie trivia game

-User is given 4 choices of directors for a given movie in the form of a radiogroup,
and they are able to select one of the choices and click the submit button beneath.
the trivia questions are created randomly from grabbing data from the database with certain restrictions,
i.e no two director movies, can't have the same director twice in the returned data, etc. 
this stops there from being errors.

-the users current game score and local session high score is displayed to the user

- if the correct director is selected the current score will increase by one and their local session
high score will increase if the current score if greater then the previous highest session score,
if the incorrect director is selected then the the attempt score and userID are sent to the triviaAttempt
table in the database for keeping stats for players, in future certain aspects like averages for a given play 
or the global playerbase can be displayed. If no answer is selected when the submit button is clicked and error message is given
and it stops the user from submitting until a message is selected.

-text below the selection shows wether the correct choice was picked or not and games automatiicaly restart if 
the wrong answer if picked

