var baseUrl = "https://ask.covidindiataskforce.org";

$(document).ready(function(){
    var questionId = getUrlVars()["id"];
    if(questionId == undefined)
    {
        $.ajax({
            url: "/questions",
            type: "GET",
            success: function(result) {
                result.forEach(function(value){
                    var id = value.id;
                    var question = value["Tweet Copy"].replace(/#AskCovidIndiaTF/ig, '');
                    var answer = value["Tweet Response"] == undefined ? "" : value["Tweet Response"];
                    AddQuestion(id, question, answer);
                })

                $(".interview_question").click(function(){
                    $(this).find(".interview_question-answer").toggle();
                });
            }
         });
    }
    else
    {
        $.ajax({
            url: "/questions/" + questionId,
            type: "GET",
            success: function(result) {
                var id = result.id;
                var question = result["Tweet Copy"].replace(/#AskCovidIndiaTF/ig, '');
                var answer = result["Tweet Response"] == undefined ? "" : result["Tweet Response"];
                AddQuestion(id, question, answer);
                $(".interview_question-answer").toggle();

                $(".interview_question").click(function(){
                    $(this).find(".interview_question-answer").toggle();
                });
            }
         });
    }
})

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function AddQuestion(id, question, answer)
{
    var qnahtml = '<div class="interview_question" data-view="ui#toggle" id="question-' + id + '">';
    qnahtml += '<div class="interview_question-question" data-role="trigger"><img alt="question badge" class="interview_question-badge" src="content/images/question_badge_bc30c7.png" />';
    qnahtml += '<div class="interview_question-content for-question content_body" data-view="shared#content_body">';
    qnahtml += '<p>' + question + '</p>';
    qnahtml += '</div>';
    qnahtml += '<div class="interview_question-question_footer"><a class="interview_question-view_link">View the answer →</a><a class="interview_question-hide_link">Hide answer</a>';
    qnahtml += '<div class="interview_question-share_links" data-text="Essential UI Interview Questions" data-title="Toptal UI Interview Questions" data-url="questions#question-' + id + '" data-view="shared#social_share">';
    qnahtml += '<a class="interview_question-share_link is-facebook" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u='+baseUrl + '?id='+id + '\', \'facebook-share-dialog\', \'width=626,height=436\'); return false;" data-type="facebook"></a>';
    qnahtml += '<a class="interview_question-share_link is-twitter" onclick="window.open(\'https://www.twitter.com/intent/tweet?text='+baseUrl + '?id='+id + '\', \'twitter-tweet-dialog\', \'width=626,height=436\'); return false;" data-type="twitter"></a>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    qnahtml += '<div class="interview_question-answer" data-view="shared#content_body"><img alt="answer badge" class="interview_question-badge" src="content/images/answer_badge_dc4c6f.png" />';
    qnahtml += '<div class="interview_question-content content_body is-small">';
    qnahtml += '<p>' + answer + '</p>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    qnahtml += '</div>';

    $(".interview_questions_list-inner").append(qnahtml);
}
