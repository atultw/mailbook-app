//
// $(function() {
//     // $('#mail_cards').delay(1000).fadeOut(400);
//     $.scrollSpeed(100, 800);
// });
//
document.getElementById('backgroundwrap').style.background = "url('https://source.unsplash.com/collection/219941/1920x1080?t=" + new Date().getTime() + "') no-repeat center center fixed"

document.addEventListener("keydown", function () {
    // added the date to prevent caching
    document.getElementById('backgroundwrap').style.background = "url('https://source.unsplash.com/collection/219941/1920x1080?t=" + new Date().getTime() + "') no-repeat center center fixed"
    console.log('updated background')
});

document.addEventListener("click", function() {
   document.getElementById('intro').classList.add('invisible')
});

function finish() {
    console.log('done');
    close()
}