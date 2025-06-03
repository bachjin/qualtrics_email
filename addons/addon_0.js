// Also try to run when Qualtrics is ready
// if (window.Qualtrics && Qualtrics.SurveyEngine) {
//     Qualtrics.SurveyEngine.addOnReady(function() {
//         var emailBody = document.getElementById('email-body');
//         if (emailBody) {
//             emailBody.innerHTML += `
//                 <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
//                     <p style="color: #666; font-size: 12px;">Diese email wurde von einem sicheren Server gesendet. Bitte antworte nicht auf diese Nachricht.</p>
//                 </div>
//             `;
//         }
//     });
// }

var emailBody = document.getElementById('email-body');
if (emailBody) {
    emailBody.innerHTML += `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px;">Diese email wurde von einem sicheren Server gesendet. Bitte antworte nicht auf diese Nachricht.</p>
        </div>
    `;
}