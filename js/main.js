$(document).ready(function(){
    $.ajax({
        url: "https://api.airtable.com/v0/appzo9fDle7O3x6GE/Expert%20Content?maxRecords=10&view=All%20QA",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer keyGIC1jLWJNtVnFA');},
        success: function(result) {
            result.records.forEach(function(value, index, array){
                var id = value.id;
                var question = value.fields["Question Header"];
                var answer = value.fields["Answer Text"] == undefined ? "" : value.fields["Answer Text"];
                AddQuestion(id, question, answer);
            })
        }
     });
})

function AddQuestion(id, question, answer)
{
    var qnahtml = '<div class="interview_question" data-view="ui#toggle" id="question-' + id + '">';
    qnahtml += '<div class="interview_question-question" data-role="trigger"><img alt="question badge" class="interview_question-badge" src="content/images/question_badge_bc30c7.png" />';
    qnahtml += '<div class="interview_question-content for-question content_body" data-view="shared#content_body">';
    qnahtml += '<p>' + question + '</p>';
    qnahtml += '</div>';
    qnahtml += '<div class="interview_question-question_footer"><a class="interview_question-view_link">View the answer →</a><a class="interview_question-hide_link">Hide answer</a>';
    qnahtml += '<div class="interview_question-share_links" data-text="Essential UI Interview Questions" data-title="Toptal UI Interview Questions" data-url="questions#question-' + id + '" data-view="shared#social_share">';
    qnahtml += '<a class="interview_question-share_link is-facebook" data-role="link" data-track-click="SocialShareButtonClicked" data-track-default-data="{&quot;network&quot;:&quot;facebook&quot;}" data-type="facebook"></a>';
    qnahtml += '<a class="interview_question-share_link is-twitter" data-role="link" data-track-click="SocialShareButtonClicked" data-track-default-data="{&quot;network&quot;:&quot;twitter&quot;}" data-type="twitter"></a>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    qnahtml += '<div class="interview_question-answer" data-view="shared#content_body"><img alt="answer badge" class="interview_question-badge" src="content/images/answer_badge_dc4c6f.png" />';
    qnahtml += '<div class="interview_question-content content_body is-small">';
    qnahtml += '<p' + answer + '</p>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    qnahtml += '</div>';
    
    $(".interview_questions_list-inner").append(qnahtml);
}